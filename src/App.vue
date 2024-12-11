<script setup>
import { onMounted } from "vue";
import TheHeader from "@/components/layout/TheHeader/TheHeader.vue";
import TodoList from "@/components/lists/TodoList.vue";
import TodoForm from "@/components/forms/TodoForm.vue";
import { useTodosStore } from "./stores/todos";

const todoStore = useTodosStore();

onMounted(() => {
  todoStore.fetchTodos();
});
</script>

<template>
  <TheHeader />
  <main class="main">
    <div class="container mainWrapper">
      <TodoForm />
      <TodoList :todos="todoStore.filteredTodos" />
    </div>
  </main>
</template>

<style lang="less">
@import "@/styles/index.less";

.main {
  background-color: #colors[bg-dark];
  min-height: 100dvh;
}

.mainWrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
