import osUtils from 'os-utils';
import os from 'os';
import fs from 'fs';
import si from 'systeminformation';
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from './util.js';

const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();
    const gpuUsage = await getGpuUsage();

    ipcWebContentsSend('statistics', mainWindow.webContents, {
      cpuUsage,
      ramUsage,
      storageUsage: storageData.usage,
      gpuUsage,
    });
  }, POLLING_INTERVAL);
}

export async function getStaticData() {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);
  
  const gpuData = await si.graphics();
  const mainGpu = gpuData.controllers[0];

  return {
    totalStorage,
    cpuModel,
    totalMemoryGB,
    gpuModel: mainGpu?.name || 'N/A',
    gpuMemoryGB: mainGpu?.memoryTotal ? Math.floor(mainGpu.memoryTotal / 1024) : 0,
  };
}

async function getGpuUsage(): Promise<number> {
  try {
    const gpuData = await si.graphics();
    const mainGpu = gpuData.controllers[0];

    if (!mainGpu?.utilizationGpu) return 0;

    return mainGpu.utilizationGpu / 100;
  }  catch (error) {
    console.error('Failed to get GPU usage:', error);
    return 0;
  }
}

function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
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