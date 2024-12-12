<template>
  <button class="button" type="submit" :disabled="todosStore.isLoading">
    {{ todosStore.isLoading ? "Sending" : "Submit" }}
  </button>
</template>

<script setup>
import { useTodosStore } from '@/stores/todos';

const todosStore = useTodosStore();
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.button {
  background-color: #colors[primary];
  border-radius: #radiuses[small];
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: @transition;
  text-transform: uppercase;
  font-weight: 700;

  &:hover {
    background-color: #colors[light];
  }
}
</style>
