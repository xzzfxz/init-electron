import { dialog, ipcMain } from 'electron';
import { TO_MAIN } from './../../src/const/ipc';

// 打开文件选择器
export const showOpenDialog = async (options: any = {}) => {
  const res = await dialog.showOpenDialog(options);
  return res;
};

ipcMain.handle(TO_MAIN.SHOW_OPEN_DIALOG, async (e: Event, data: string) => {
  return await showOpenDialog(data);
});
