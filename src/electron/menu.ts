import { BrowserWindow, Menu, app } from 'electron';
import { ipcWebContentsSend, isDev } from './util.js';

export function createMenu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: process.platform === 'win32' ? 'App' : undefined,
        type: 'submenu',
        submenu: [
          {
            label: 'DevTools',
            click: () => mainWindow.webContents.openDevTools(),
            visible: isDev(),
          },
          {
            label: 'Quit',
            click: app.quit,
          },
        ],
      },
    ])
  );
}
