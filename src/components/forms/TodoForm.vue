<template>
  <form @submit.prevent="handleSubmit" class="form">
    <input
      type="text"
      placeholder="write title"
      v-model.trim="title"
      required
    />
    <input
      type="text"
      placeholder="add category"
      v-model.trim="category"
      required
    />
    <button type="submit" :disabled="todosStore.isLoading">
      {{ todosStore.isLoading ? "Sending" : "Submit" }}
    </button>
  </form>
</template>

<script setup>
import { useTodosStore } from "@/stores/todos";
import { ref } from "vue";

const todosStore = useTodosStore();
const title = ref("");
const category = ref("");

const handleSubmit = async () => {
  try {
    await todosStore.addTodo(title.value, category.value);
    title.value = "";
    category.value = "";
  } catch (error) {
    console.log(error);
    alert("Error");
  }
};
</script>

<style lang="less" scoped>
@import "@/styles/index.less";

.form {
  width: 100%;
  height: 100px;
  border-radius: #radiuses[small];
  background-color: #colors[white];
}
</style>
