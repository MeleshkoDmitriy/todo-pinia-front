<template>
  <div class="wrapper">
    <button
      @click="setFilter(status)"
      :class="{ tab: true, active: todosStore.filter === status }"
    >
      {{ status }}
    </button>
    <AppBadge
      :quantity="todosStore.getQuantity(status)"
      v-show="todosStore.filter === status"
    />
  </div>
</template>

<script setup>
import { allowedStatuses } from "@/constants/allowedStatuses";
import { useTodosStore } from "@/stores/todos";
import AppBadge from "../items/AppBadge.vue";

const todosStore = useTodosStore();

const props = defineProps({
  status: {
    type: String,
    default: "all",
    validator: (value) => allowedStatuses.includes(value),
  },
});

const setFilter = (filter) => {
  todosStore.filter = filter;
};
</script>

<style lang="less" scoped>
@import "@/styles/index.less";

.wrapper {
  position: relative;
}

.tab {
  padding: 10px 20px;
  border: none;
  border-radius: #radiuses[small];
  outline: none;
  cursor: pointer;
  color: #colors[white];
  background-color: #colors[secondary];
  font-weight: 700;
  transition: @transition;
  text-transform: uppercase;
}

.active {
  background-color: #colors[white];
  color: #colors[primary];
}
</style>