<script setup lang="ts">
import { onMounted, ref } from 'vue';
import IconLoad from './components/icons/IconLoad.vue';
import { apiUser } from '@/utils/axiosApi';
import { useUserStore } from '@/stores/user';
const user = useUserStore();
const dataLoaded = ref(false);

onMounted(() => {
  // check dark mode
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // check token
  const token = localStorage.getItem('metaWall');
  if (!token) {
    dataLoaded.value = true;
    return;
  }

  apiUser
    .check(token)
    .then((res) => {
      user.id = res.data.data._id;
      user.name = res.data.data.name;
      user.avatar = res.data.data.avatar;
      dataLoaded.value = true;
    })
    .catch(() => {
      dataLoaded.value = true;
    });
});
</script>

<template>
  <router-view v-if="dataLoaded"></router-view>
  <div
    v-else
    class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-bg-light dark:bg-bg-dark">
    <div class="grid animate-pulse">
      <div
        class="font-paytone text-4xl tracking-wider text-black dark:text-gray-300">
        MetaWall
      </div>
      <div class="mt-4 flex justify-center">
        <IconLoad
          class="h-8 w-8 animate-spin text-black dark:text-gray-300"></IconLoad>
      </div>
    </div>
  </div>
</template>
