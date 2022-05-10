<script setup lang="ts">
defineProps<{ imgUrl?: Array<string> }>();
</script>

<template>
  <div class="flex flex-wrap">
    <div
      v-for="(img, index) of imgUrl?.slice(0, 3)"
      :key="index"
      class="relative box-border border-[1px] border-black dark:border-gray-400"
      :class="{
        'w-full': imgUrl?.length === 1,
        'w-6/12': imgUrl?.length === 2,
        'w-6/12 first:w-full': imgUrl?.length > 2,
      }"
    >
      <img
        class="max-h-[50vh] w-full cursor-pointer object-cover hover:brightness-110"
        :class="{
          'brightness-50 hover:brightness-75':
            index === 2 && imgUrl?.length > 3,
        }"
        :src="img"
      />
      <p
        v-if="index === 2 && imgUrl?.length > 3"
        class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] select-none font-sans text-4xl text-gray-100"
      >
        + {{ imgUrl?.length - 3 }}
      </p>
    </div>
  </div>
</template>
