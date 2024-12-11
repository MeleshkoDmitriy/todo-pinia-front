<template>
  <header class="header">
    <div class="container">
      <div class="wrapper">
        <div class="logo">
          <img class="image" src="@/assets/logo.svg" alt="logo" />
        </div>
        <div class="tabs">
          <AppTab
            v-for="status in allowedStatuses"
            :key="status"
            :status="status"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useTodosStore } from "@/stores/todos";
import AppTab from "../../items/AppTab.vue";
import { allowedStatuses } from "@/constants/allowedStatuses";

const todosStore = useTodosStore();
</script>

<style lang="less" scoped>
@import "@/styles/index.less";

.header {
  background-color: #colors[primary];
  height: #sizes[header];

  .wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: #sizes[header];

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

    .tabs {
      display: flex;
      gap: 10px;
    }
  }
}
</style>
