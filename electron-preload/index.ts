import { contextBridge, ipcRenderer } from 'electron';

// 暴露变量
contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

// 进程间通信
contextBridge.exposeInMainWorld('ipcRenderer', {
  ping: () => ipcRenderer.invoke('ping'),
});
