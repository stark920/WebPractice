<script setup lang="ts">
interface Props {
  size?: number
  avatar?: string
}
withDefaults(defineProps<Props>(), {
  size: 40,
  avatar: 'user_default.png'
})

function getImageUrl(url: string) {
  if (url.startsWith('http')) return url
  return new URL(`../assets/${url}`, import.meta.url).href
}
</script>

<template>
  <div class="rounded-full" :style="`width: ${size}px; height: ${size}px`">
    <img :src="getImageUrl(avatar)" class="w-full object-contain" />
  </div>
</template>
