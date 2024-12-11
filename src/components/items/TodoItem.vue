<template>
  <div class="wrapper">
    <div class="content">
      <span class="title">{{ todo.title }}</span>
      <span class="category">{{ todo.category }}</span>
    </div>
    <div class="buttons">+</div>
  </div>
</template>

<script setup>
defineProps({
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
}
</style>
