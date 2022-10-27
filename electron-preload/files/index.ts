import fs from 'fs';
import path from 'path';

// 判断文件是否存在
export const jugdgeFileExist = (filePath: string) => {
  return fs.existsSync(filePath);
};

// 将buffer转为File对象
const transformBufferToFile = (buffer: Buffer[], fileName: string) => {
  if (!buffer) {
    return null;
  }
  const blob = new Blob(buffer);
  return new File([blob], fileName);
};

/**
 * @description: 读取文件，
 * @param {string} filePath 文件路径
 * @param {boolean} returnFile  是否返回File对象，false时返回buffer
 * @return {*}
 */
export const readFile = (filePath: string, returnFile: boolean = true) => {
  return new Promise((resolve) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        resolve(null);
      } else {
        if (returnFile) {
          const res = transformBufferToFile([data], path.basename(filePath));
          resolve({ data: res, name: path.basename(filePath) });
        } else {
          resolve({ data, name: path.basename(filePath) });
        }
      }
    });
  });
};
