<script setup lang="ts">
interface Props {
  size?: number;
}
withDefaults(defineProps<Props>(), {
  size: 50,
});
</script>

<template>
  <div
    class="flex cursor-pointer items-center justify-center rounded-full border-2 border-black dark:border-gray-400"
    :style="`width: ${size}px; height: ${size}px`">
    <slot />
  </div>
</template>
