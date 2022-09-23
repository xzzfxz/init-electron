import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // 是否开启隔离上下文
      contextIsolation: true,
      // 渲染进程使用Node API
      nodeIntegration: false,
      // 需要引用js(后缀名改为js，源文件可以用ts)文件，不能用ts
      preload: path.join(__dirname, '../electron-preload/index.js'),
    },
  });
  // 如果打包了，渲染index.html
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../index.html'));
  } else {
    win.webContents.openDevTools();
    const url = 'http://localhost:5173';
    win.loadURL(url);
  }
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('ping', (e: Event, data: string) => {
  console.log(data);
});
