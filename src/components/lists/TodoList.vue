<template>
  <ul class="list">
    <li v-for="todo in todos" :key="todo.id">
      <TodoItem :todo="todo" />
    </li>
  </ul>
</template>

<script setup>
import TodoItem from '../items/TodoItem.vue';

defineProps({
  todos: {
    type: Array,
    required: true,
    default: () => [],
    validator: (arr) => {
      return arr.every(({ id, title, category, completed }) => {
        return (
          typeof id === "number" &&
          typeof title === "string" &&
          typeof category === "string" &&
          typeof completed === "boolean"
        );
      });
    },
  },
});
</script>

<style lang="less" scoped>
@import "@/styles/index.less";

.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
