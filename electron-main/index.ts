import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import './dialog';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const createWindow = (partition: string) => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      sandbox: false,
      // 是否开启隔离上下文
      contextIsolation: true,
      // 渲染进程使用Node API
      nodeIntegration: false,
      // 需要引用js(后缀名改为js，源文件可以用ts)文件，不能用ts
      preload: path.join(__dirname, '../electron-preload/index.js'),
      // partition: 'persist:' + partition,
    },
  });

  // 如果打包了，渲染index.html
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../index.html'), { hash: 'login' });
  } else {
    win.webContents.openDevTools();
    const url = 'http://localhost:5173/#/login';
    win.loadURL(url);
  }
};

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  // 第二个实例
  app.whenReady().then(() => {
    createWindow('second');
    app.on('activate', () => {
      if (!BrowserWindow.getAllWindows().length) {
        createWindow('second');
      }
    });
  });
} else {
  app.whenReady().then(() => {
    createWindow('first');
    app.on('activate', () => {
      if (!BrowserWindow.getAllWindows().length) {
        createWindow('first');
      }
    });
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
