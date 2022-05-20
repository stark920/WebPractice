<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import IconSun from './icons/IconSun.vue';
import IconMoon from './icons/IconMoon.vue';

const isDark = ref('light');

onBeforeMount(() => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = 'dark';
  }
});

function toggleDarkMode() {
  if (isDark.value === 'light') {
    isDark.value = 'dark';
    localStorage.theme = 'dark';
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = 'light';
    localStorage.theme = 'light';
    document.documentElement.classList.remove('dark');
  }
}
</script>

<template>
  <IconSun
    v-show="isDark === 'dark'"
    class="cursor-pointer text-gray-400 hover:text-white"
    @click="toggleDarkMode">
    <title>關閉夜間模式</title>
  </IconSun>
  <IconMoon
    v-show="isDark === 'light'"
    class="cursor-pointer self-center text-gray-400 hover:text-black"
    @click="toggleDarkMode">
    <title>夜間模式</title>
  </IconMoon>
</template>
