import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { BASE_URL } from '@/api/api'
import axios from 'axios'

export const useTodosStore = defineStore('todolist', () => {
  const todos = ref([])

  const fetchTodos = async () => {
    const res = await axios.get(BASE_URL);

    todos.value = res.data;

console.log(todos)

  }

  return { todos, fetchTodos }
})
