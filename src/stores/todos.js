import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { BASE_URL } from "@/api/api";
import axios from "axios";
import { generateId } from "@/utils/generateId";
import { allowedStatuses } from "@/constants/allowedStatuses";

export const useTodosStore = defineStore("todolist", () => {
  const isError = ref(false);
  const isLoading = ref(false);
  const todos = ref([]);
  const filter = ref("all");

  const quantityTodos = computed(() => todos.value.length);
  const completedTodos = computed(
    () => todos.value.filter((todo) => todo.completed).length
  );
  const activeTodos = computed(
    () => todos.value.filter((todo) => !todo.completed).length
  );
  const filteredTodos = computed(() => {
    return todos.value.filter((todo) => {
      switch (filter.value) {
        case allowedStatuses[0]:
          return true;
        case allowedStatuses[1]:
          return todo.completed; 
        case allowedStatuses[2]:
          return !todo.completed; 
        default:
          return false;
      }
    });
  });
  const getQuantity = (status) => {
    if (status === allowedStatuses[0]) {
      return quantityTodos.value;
    } else if (status === allowedStatuses[1]) {
      return completedTodos.value;
    } else if (status === allowedStatuses[2]) {
      return activeTodos.value;
    } else {
      return 0;
    }
  };
  const fetchTodos = async () => {
    try {
      isLoading.value = true;
      isError.value = false;
      const res = await axios.get(BASE_URL);
      todos.value = res.data.slice().reverse();
    } catch (error) {
      console.error(error);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const addTodo = async (title, category) => {
    const newTodo = {
      id: generateId(),
      title,
      category,
      completed: false,
    };

    try {
      isLoading.value = true;
      isError.value = false;
      const response = await axios.post(BASE_URL, newTodo);
      todos.value.unshift(response.data);
    } catch (error) {
      console.error(error);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const toggleTodo = async (id) => {
    try {
      isLoading.value = true;
      isError.value = false;

      await axios.patch(`${BASE_URL}/${id}`);

      todos.value = todos.value.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      console.log(todos.value);
    } catch (error) {
      console.error(error);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const removeTodo = async (id) => {
    try {
      isLoading.value = true;
      isError.value = false;

      await axios.delete(`${BASE_URL}/${id}`);

      todos.value = todos.value.filter((todo) => todo.id !== id);

      console.log(todos.value);
    } catch (error) {
      console.error(error);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const updateTodo = async (id, updatedTitle, updatedCategory) => {
    try {
      isLoading.value = true;
      isError.value = false;

      await axios.put(`${BASE_URL}/${id}`, {
        title: updatedTitle,
        category: updatedCategory,
      });

      todos.value = todos.value.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            id,
            title: updatedTitle,
            category: updatedCategory,
            completed: false,
          };
        }
        return todo;
      });

      console.log(todos.value);
    } catch (error) {
      console.error(error);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    todos,
    fetchTodos,
    addTodo,
    toggleTodo,
    removeTodo,
    updateTodo,
    filter,
    filteredTodos,
    quantityTodos,
    completedTodos,
    activeTodos,
    getQuantity
  };
});
