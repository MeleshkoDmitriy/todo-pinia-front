<template>
  <div class="wrapper">
    <div class="content" v-if="!isEditingTodo">
      <span :class="{title: true, done: todo.completed }">{{ todo.title }}</span>
      <span class="category">{{ todo.category }}</span>
      <span :class="{completed: true, done: todo.completed}">{{
        todo.completed ? "completed" : "active"
      }}</span>
    </div>
    <div class="edit" v-else>
      <AppInput v-model="title" placeholder="Task title" />
      <AppInput v-model="category" placeholder="Task category" />
    </div>
    <div class="buttons">
      <TodoButton 
        :type="todo.completed ? 'active' : 'done'" 
        :action="() => todosStore.toggleTodo(todo.id)" 
      />
      <TodoButton 
        type="edit" 
        :action="() => { isEditingTodo = true; }" 
        v-if="!isEditingTodo" 
      />
      <TodoButton 
        type="save" 
        :action="handleUpdate" 
        v-if="isEditingTodo" 
      />
      <TodoButton 
        type="remove" 
        :action="() => todosStore.removeTodo(todo.id)" 
      />
    </div>
  </div>
</template>

<script setup>
import { useTodosStore } from "@/stores/todos";
import { ref, watch } from "vue";
import  TodoButton  from '../buttons/TodoButton.vue'
import  AppInput  from '../items/AppInput.vue'

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
  min-height: 115px;
  padding: 20px;
  background-color: #colors[white];
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-radius: #radiuses[small];
  overflow: hidden;

  .edit {
    display: flex;
    gap: 10px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .title {
      font-size: 20px;
      font-weight: 700;
      color: #colors[primary];

      &.done {
        text-decoration: line-through;
      }
    }

    .category {
      font-size: 16px;
      color: #colors[secondary];
      text-decoration: underline;
    }

    .completed {
      font-size: 10px;
      color: red;

      &.done {
        color: #colors[primary];
      }
    }
  }

  .buttons {
    display: flex;
    gap: 10px;
  }
}
</style>
