<script setup lang="ts">
defineProps<{ title?: string }>();
</script>

<template>
  <div
    class="custom-border dark:dark-card shadow-block flex w-full items-center justify-center bg-white py-4 font-azeret text-xl font-bold">
    {{ title }}
  </div>
</template>

<style scoped>
.shadow-block {
  position: relative;
}
.shadow-block::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 2px solid #000040;
  top: 2px;
  right: 2px;
  z-index: -1;
  box-sizing: content-box;
}
.dark .shadow-block::after {
  background-color: #374151;
  border: 2px solid #4b5563;
  top: 2px;
  right: 2px;
  z-index: -1;
  box-sizing: content-box;
}
</style>
