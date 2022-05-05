<script setup lang="ts">
import { onMounted, ref } from 'vue';
import IconSunVue from '@/components/icons/IconSun.vue';
import IconMoonVue from '@/components/icons/IconMoon.vue';
import AvatarIcon from '../../components/AvatarIcon.vue';

let isDark = ref('light');

onMounted(() => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = 'dark';
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = 'light';
    document.documentElement.classList.remove('dark');
  }
});

/**
 *
 */
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
  <header
    class="fixed top-0 left-0 right-0 z-50 border-b-2 border-black bg-white dark:border-gray-500 dark:bg-gray-800"
  >
    <div
      class="mx-auto flex h-[60px] w-full max-w-screen-lg items-center justify-between px-2 dark:text-white lg:px-4"
    >
      <router-link
        to="/"
        class="font-paytone text-[1.625rem] font-bold tracking-wide"
      >
        MetaWall
      </router-link>
      <div class="flex select-none items-center">
        <div class="mr-4">
          <IconSunVue
            v-show="isDark === 'dark'"
            class="cursor-pointer text-gray-400 hover:text-white"
            @click="toggleDarkMode"
          >
            <title>關閉夜間模式</title>
          </IconSunVue>
          <IconMoonVue
            v-show="isDark === 'light'"
            class="cursor-pointer self-center text-gray-400 hover:text-black"
            @click="toggleDarkMode"
          >
            <title>夜間模式</title>
          </IconMoonVue>
        </div>
        <AvatarIcon :size="30" class="mr-2" />
        <button
          type="button"
          class="border-b-2 border-black font-azeret font-bold dark:border-gray-300"
        >
          Member
        </button>
      </div>
    </div>
  </header>
</template>
