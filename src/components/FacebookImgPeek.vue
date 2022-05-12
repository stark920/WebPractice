<script setup lang="ts">
import { useLightBoxStore } from '@/stores/lightBox';

defineProps<{ images?: Array<string> }>();

const lightBox = useLightBoxStore();

function showLightBox(data: Array<string>) {
  lightBox.show = true;
  lightBox.images = data;
}
</script>

<template>
  <div v-if="images" class="dark:dark-card grid w-full grid-cols-2 gap-[1px]">
    <template v-for="(img, index) of images?.slice(0, 3)" :key="index">
      <div
        class="box-border max-h-[60vh] cursor-pointer last:relative hover:brightness-125"
        :class="{
          'first:col-span-2': images?.length === 1 || images?.length > 2,
        }"
        @click="if (images) showLightBox(images);"
      >
        <img class="h-full w-full object-cover" :src="img" />
        <p
          v-if="index === 2 && images?.length > 3"
          class="absolute top-0 bottom-0 left-0 right-0 flex select-none items-center justify-center bg-[rgba(0,0,0,.8)] font-sans text-4xl text-gray-100"
        >
          + {{ images?.length - 3 }}
        </p>
      </div>
    </template>
  </div>
</template>
