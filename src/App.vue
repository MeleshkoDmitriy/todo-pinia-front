<script setup>
import { onMounted } from "vue";
import TheHeader from "@/components/layout/TheHeader/TheHeader.vue";
import TodoList from "@/components/lists/TodoList.vue";
import { useTodosStore } from "./stores/todos";

const todoStore = useTodosStore();

onMounted(() => {
  todoStore.fetchTodos();
});
</script>

<template>
  <TheHeader />
  <main class="main">
    <div class="container">
      <TodoList :todos="todoStore.todos" />
    </div>
  </main>
</template>

<style lang="less">
@import "@/styles/index.less";

.main {
  background-color: #colors[bg-dark];
  min-height: 100dvh;
}
</style>
