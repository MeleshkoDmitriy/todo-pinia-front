<template>
  <input
    class="input"
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    @input="updateValue($event.target.value)"
    required
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: { 
    type: String,
    required: true,
    default: '',
  },
  placeholder: {
    type: String,
    required: true,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']); 

const updateValue = (value) => {
  emit('update:modelValue', value); 
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #colors[primary];
  border-radius: #radiuses[small];
  outline: none;
  transition: @transition;
}
</style>
