<template>
  <router-link class="link" to="/">首页</router-link>
  <router-link class="link" to="/login">登录</router-link>
  <router-link class="link" to="/db">indexedDB</router-link>
  <router-view></router-view>
</template>

<script setup lang="ts"></script>

<style scoped>
.link {
  margin-right: 4px;
}
</style>
