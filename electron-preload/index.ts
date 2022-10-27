import { contextBridge, ipcRenderer } from 'electron';
import { jugdgeFileExist, readFile } from './files';
import { TO_MAIN } from './../src/const/ipc';

// 暴露变量
contextBridge.exposeInMainWorld('store', {
  node: process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

// 进程间通信
contextBridge.exposeInMainWorld('ipcRenderer', {
  showOpenDialog: (options) =>
    ipcRenderer.invoke(TO_MAIN.SHOW_OPEN_DIALOG, options),
});

// 静态方法
contextBridge.exposeInMainWorld('proxy', {
  jugdgeFileExist,
  readFile,
});
