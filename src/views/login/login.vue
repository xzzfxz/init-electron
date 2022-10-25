<template>
  {{ filePath }}
  <div class="open" @click="selectFile">选择文件</div>
  <div class="open" @click="judgeFileExist">判断文件是否存在</div>
  <div class="open" @click="handleReadFile">读取文件</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const filePath = ref('');

// 选择文件
const selectFile = () => {
  window.ipcRenderer.showOpenDialog().then((res: any) => {
    if (!res.canceled) {
      filePath.value = res.filePaths[0];
    }
  });
};

// 判断文件是否存在
const judgeFileExist = () => {
  const isExist = window.proxy.jugdgeFileExist(filePath.value);
  console.log('文件是否存在', isExist);
};

// 读取文件
const handleReadFile = async () => {
  const res = await window.proxy.readFile(filePath.value);
  console.log('文件', res.data, res.name);
};
</script>

<style lang="scss" scoped>
.open {
  padding: 0 8px;
  height: 30px;
  border: 1px solid #dcdcdc;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
