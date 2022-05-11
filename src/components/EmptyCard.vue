<script setup lang="ts">
defineProps<{
  content: string;
}>();
</script>

<template>
  <div
    class="custom-border shadow-black-3px dark:dark-card mb-4 w-full rounded-lg bg-white"
  >
    <div class="flex border-b-2 border-black p-4 dark:border-gray-600">
      <div
        class="mr-1 h-2 w-2 rounded-full border-[1px] border-gray-500 bg-apple-red"
      ></div>
      <div
        class="mr-1 h-2 w-2 rounded-full border-[1px] border-gray-500 bg-apple-yellow"
      ></div>
      <div
        class="h-2 w-2 rounded-full border-[1px] border-gray-500 bg-apple-green"
      ></div>
    </div>
    <div class="p-12 text-center text-gray-400 dark:text-gray-300">
      {{ content }}
    </div>
  </div>
</template>
