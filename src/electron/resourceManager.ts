import osUtils from 'os-utils';
import os from 'os';
import fs from 'fs';
import si from 'systeminformation';
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from './util.js';
import { exec } from 'child_process';

const POLLING_INTERVAL = 100;

export function pollResources(mainWindow: BrowserWindow) {
  let isPolling = false;

  const pollResourcesInternal = async () => {
    if (isPolling) return;

    try {
      isPolling = true;

      const [cpuUsage, ramUsage, storageData, gpuUsage] = await Promise.all([
        getCpuUsage(),
        getRamUsage(),
        getStorageData(),
        getGpuUsage()
      ]);

      ipcWebContentsSend('statistics', mainWindow.webContents, {
        cpuUsage,
        ramUsage,
        storageUsage: storageData.usage,
        gpuUsage,
      });
    } catch (error) {
      console.error('Resource polling error:', error);
    } finally {
      isPolling = false;
    }
  };

  pollResourcesInternal();

  const intervalId = setInterval(pollResourcesInternal, POLLING_INTERVAL);

  return () => clearInterval(intervalId);
}


export async function getStaticData() {
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);
  
  try {

    const storageData = await getStorageData();

    const gpuData = await si.graphics();
    
    const validGpus = gpuData.controllers.filter(
      gpu => gpu && (gpu.name || gpu.model)
    );

    const mainGpu = validGpus[0] || {};

    let gpuMemoryGB = 0;
    if (mainGpu.vram) {
      gpuMemoryGB = Math.floor(mainGpu.vram  / 1024);
    }else if (mainGpu.memoryTotal)
    {
      gpuMemoryGB = Math.floor(mainGpu.memoryTotal / 1024);
    }

    return {
      totalStorage: storageData.total,
      cpuModel,
      totalMemoryGB,
      gpuModel: mainGpu.name || mainGpu.model || 'N/A',
      gpuMemoryGB: gpuMemoryGB,
    };
  } catch (error) {
    console.error('Static data detection failed:', error);
    return {
      totalStorage: 0,
      cpuModel,
      totalMemoryGB,
      gpuModel: 'N/A',
      gpuMemoryGB: 0,
    };
  }
}

function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    exec('wmic cpu get loadpercentage', (error, stdout) => {
      if (error) {
        console.error('CPU usage detection failed:', error);
        return resolve(0);
      }
      
      try {
        // Extract the numeric value from the output
        const match = stdout.match(/\d+/);
        const cpuUsage = match ? parseInt(match[0], 10) / 100 : 0;
        
        // Ensure the value is between 0 and 1
        const finalUsage = Math.min(Math.max(cpuUsage, 0), 1);
        
        resolve(finalUsage);
      } catch (parseError) {
        console.error('Failed to parse CPU usage:', parseError);
        resolve(0);
      }
    });
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
}

async function getGpuUsage(): Promise<number> {
  try {

    return new Promise<number>((resolve) => {

      if (process.platform === 'win32' || process.platform === 'linux') {
        exec('nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits', (error: Error | null, stdout: string, stderr: string) => {
          if (error) {
            console.warn('nvidia-smi command failed:', error);
            return resolve(0);
          }
          
          try {
            const gpuUsage = parseFloat(stdout.trim()) / 100;
            const finalUtilization = Math.min(Math.max(gpuUsage, 0), 1);
            resolve(finalUtilization);
          } catch (parseError) {
            console.error('Failed to parse nvidia-smi output:', parseError);
            resolve(0);
          }
        });
      } else {
        resolve(0);
      }
    });
  } catch (error) {
    console.error('GPU usage detection failed', error);
    return 0;
  }
}