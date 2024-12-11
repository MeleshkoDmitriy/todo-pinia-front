<template>
  <div class="wrapper">
    <div class="content" v-if="!isEditingTodo">
      <span class="title">{{ todo.title }}</span>
      <span class="category">{{ todo.category }}</span>
      <span class="completed">{{
        todo.completed ? "completed" : "not completed"
      }}</span>
    </div>
    <div v-else>
      <input type="text" v-model="title" />
      <input type="text" v-model="category" />
    </div>
    <div class="buttons">
      <button @click="todosStore.toggleTodo(todo.id)">update</button>
      <button @click="isEditingTodo = true" v-if="!isEditingTodo">edit</button>
      <button @click="handleUpdate" v-else>save</button>
      <button @click="todosStore.removeTodo(todo.id)">delete</button>
    </div>
  </div>
</template>

<script setup>
import { useTodosStore } from "@/stores/todos";
import { ref, watch } from "vue";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
    validator: (todo) => {
      return (
        typeof todo.id === "number" &&
        typeof todo.title === "string" &&
        typeof todo.category === "string" &&
        typeof todo.completed === "boolean"
      );
    },
  },
});

const todosStore = useTodosStore();
const isEditingTodo = ref(false);

const title = ref(props.todo.title);
const category = ref(props.todo.category);

const handleUpdate = async () => {
  await todosStore.updateTodo(props.todo.id, title.value, category.value);
  isEditingTodo.value = false;
};

watch(isEditingTodo, (val) => {
  if (!val) {
    title.value = props.todo.title;
    category.value = props.todo.category;
  }
});
</script>

<style lang="less" scoped>
@import "@/styles/index.less";

.wrapper {
  width: 100%;
  padding: 20px;
  background-color: #colors[white];
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-radius: #radiuses[small];
  overflow: hidden;

  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }
}
</style>
