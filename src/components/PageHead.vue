<template>
  <div class="page-head">
    <div class="page-title">{{ props.title }}</div>
    <div class="action-btn">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script setup name="PageHead">
const props = defineProps({
  title: {
    type: String,
    default: '页面标题'
  }
})
</script>

<style lang="scss" scoped>
.page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-title {
    font-size: 24px;
    color: #2d3748;
  }
}
</style>
