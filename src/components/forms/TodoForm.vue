<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="group">
      <AppInput v-model="title" placeholder="Task title" />
      <AppInput v-model="category" placeholder="Task category" />
    </div>
    <div class="button">
      <FormButton />
    </div>
  </form>
</template>

<script setup>
import { useTodosStore } from "@/stores/todos";
import AppInput from "../items/AppInput.vue";
import FormButton from "../buttons/FormButton.vue";
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
  border-radius: #radiuses[small];
  background-color: #colors[white];
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .group {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .button {
    align-self: flex-end;
  }
}
</style>
