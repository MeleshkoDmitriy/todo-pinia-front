<template>
  <button @click="handleClick" class="button">
    <span class="icon" v-html="buttonTypes[type]"></span>
  </button>
</template>

<script setup>
import { buttonTypes } from "../../constants/buttonTypes";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  action: {
    type: Function,
    required: false,
  },
});

const handleClick = () => {
  if (typeof props.action === 'function') {
    props.action();
  } else {
    console.warn(`Action is not a valid function for button type: ${props.type}`);
  }
};
</script>

<style lang="less" scoped>
@import "@/styles/index.less";

.button {
  width: 20px;
  height: 20px;
  .icon {
  }
}
</style>
