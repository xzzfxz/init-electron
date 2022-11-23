<template>
  <div class="open" @click="handleAddData(1)">添加数据1</div>
  <div class="open" @click="handleAddData(2)">添加数据2</div>
  <div class="open" @click="handleReadData">读取数据</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const state = reactive({
  db: undefined as unknown as IDBDatabase,
  userInfoStore: undefined as unknown as IDBObjectStore,
});

const request = window.indexedDB.open('test', 2);
request.onsuccess = (e) => {
  state.db = request.result;
  console.log('success', e);
  console.log(state.db.version);
};

request.onerror = (e) => {
  console.log('error', e);
};

request.onupgradeneeded = (e) => {
  console.log('update', e);
  state.db = request.result;
  if (!state.db.objectStoreNames.contains('userInfo')) {
    state.userInfoStore = state.db.createObjectStore('userInfo', {
      autoIncrement: true,
    });
  }
};

// 添加数据1
const handleAddData = (idx: number) => {
  let req;
  let test = [{}];
  // for (let i = 0; i < 1000000; i++) {
  //   test.push({ userName: '张三' });
  // }
  if (idx === 1) {
    req = state.db
      .transaction(['userInfo'], 'readwrite')
      .objectStore('userInfo')
      .add({ arr: test });
  } else {
    req = state.db
      .transaction(['userInfo'], 'readwrite')
      .objectStore('userInfo')
      .add({ userName: '李四' });
  }
  req.onsuccess = (e) => {
    console.log('数据添加成功', e);
  };
  req.onerror = (e) => {
    console.log('数据添加失败', e);
  };
};

// 读取数据
const handleReadData = () => {
  const req = state.db.transaction('userInfo').objectStore('userInfo').getAll();
  req.onsuccess = (e) => {
    console.log('读取成功', e.target);
  };
  req.onerror = (e) => {
    console.log('读取失败', e);
  };
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
