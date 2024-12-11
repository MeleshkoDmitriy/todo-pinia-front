<template>
  <header class="header">
    <div class="container">
    <div class="logo">
      <img class="image" src="@/assets/logo.svg" alt="logo" />
    </div>
  </div>
  </header>
</template>

<script setup></script>

<style lang="less" scoped>
@import "@/styles/index.less";

.header {
  background-color: #colors[primary];
  height: #sizes[header];
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    width: 50px;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #colors[white];
    border-radius: 50%;

    .image {
      width: 30px;
      height: auto;
      position: relative;
      top: 2px;
    }
  }
}
</style>
