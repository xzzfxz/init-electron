import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import electron from 'vite-plugin-electron';
import electronRenderer from 'vite-plugin-electron-renderer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      // 主进程文件
      main: { entry: 'electron-main/index.ts' },
      // 预加载文件
      preload: {
        input: path.join(__dirname, 'electron-preload/index.ts'),
        vite: {
          build: {
            sourcemap: 'inline',
            outDir: 'dist/electron-preload',
          },
        },
      },
    }),
    electronRenderer(),
  ],
  build: {
    // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '/src'),
    },
  },
});
