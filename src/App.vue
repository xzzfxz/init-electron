<template>
  <div>
    <div>node: {{ state.node }}</div>
    <div>chrome: {{ state.chrome }}</div>
    <div>electron: {{ state.electron }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';

const state = reactive({
  node: window.versions.node,
  chrome: window.versions.chrome(),
  electron: window.versions.electron(),
});

onMounted(() => {
  // 向主进程发送消息;
  // window.ipcRenderer.ping();
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
