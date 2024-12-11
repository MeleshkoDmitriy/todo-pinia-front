<template>
  <div class="badge">
    <span class="num">{{ quantity }}</span>
  </div>
</template>

<script setup>
defineProps({
  quantity: {
    type: Number,
    required: true,
  }
})

</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.badge {
  position: absolute;
  top: 10px;
  right: -10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 3px solid #colors[primary];
  background-color: #colors[white];
  display: flex;
  align-items: center;
  justify-content: center;

  .num {
    font-size: 15px;
    color: #colors[primary];
  }
}
</style>