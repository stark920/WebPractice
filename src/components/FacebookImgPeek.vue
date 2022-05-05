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
        class="img-mask max-h-[50vh] w-full cursor-pointer object-cover"
        :class="{ 'img-mask-last': index === 2 && imgUrl?.length > 3 }"
        :src="img"
      />
      <p
        v-if="index === 2 && imgUrl?.length > 3"
        class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] font-sans text-4xl text-gray-100"
      >
        + {{ imgUrl?.length - 3 }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.img-mask:hover {
  filter: brightness(120%);
}
.img-mask-last {
  filter: brightness(60%);
}
.img-mask-last:hover {
  filter: brightness(70%);
}
</style>
