<script setup lang="ts">
defineProps<{ imgUrl?: Array<string> }>();
</script>

<template>
  <div class="flex flex-wrap">
    <div
      v-for="(img, index) of imgUrl?.slice(0, 3)"
      :key="index"
      class="relative box-border flex max-h-[50vh] min-h-[100px] cursor-pointer items-center justify-center border-[1px] border-black hover:brightness-125 dark:border-gray-400"
      :class="{
        'w-full': imgUrl?.length === 1,
        'w-6/12': imgUrl?.length === 2,
        'w-6/12 first:w-full': imgUrl?.length > 2,
      }"
    >
      <img class="max-w-full object-cover" :src="img" />
      <p
        v-if="index === 2 && imgUrl?.length > 3"
        class="absolute top-0 bottom-0 left-0 right-0 flex select-none items-center justify-center bg-[rgba(0,0,0,.8)] font-sans text-4xl text-gray-100"
      >
        + {{ imgUrl?.length - 3 }}
      </p>
    </div>
  </div>
</template>
