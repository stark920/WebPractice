<script setup lang="ts">
import ButtonIcon from '../../components/ButtonIcon.vue';
import IconBell from '../../components/icons/IconBell.vue';
import IconThumbUp from '../../components/icons/IconThumbUp.vue';
import AvatarIcon from '../../components/AvatarIcon.vue';
import { useUserStore } from '@/stores/user';
const user = useUserStore();
</script>

<template>
  <div
    class="custom-border dark:dark-card sticky top-[calc(60px+2rem)] w-full bg-white px-6 py-8"
  >
    <router-link to="/home/post">
      <button
        type="button"
        class="primary-color custom-border mb-6 w-full rounded-lg py-3 font-azeret font-bold shadow-sm shadow-black"
      >
        張貼動態
      </button>
    </router-link>
    <router-link to="/profile" class="group mb-4 flex items-center">
      <AvatarIcon :size="50" />
      <div
        class="ml-4 font-sans font-bold group-hover:text-primary dark:text-gray-200 dark:group-hover:text-white"
      >
        {{ user.name }}
      </div>
    </router-link>
    <router-link to="/" class="group mb-4 flex items-center">
      <ButtonIcon
        class="bg-primary-light group-hover:bg-primary group-hover:text-white dark:bg-gray-600 dark:group-hover:bg-gray-500"
      >
        <IconBell class="h-6 w-6" />
      </ButtonIcon>
      <div
        class="ml-4 font-sans font-bold group-hover:text-primary dark:text-gray-200 dark:group-hover:text-white"
      >
        追蹤名單
      </div>
    </router-link>
    <router-link to="/" class="group flex items-center">
      <ButtonIcon
        class="bg-primary-light group-hover:bg-primary group-hover:text-white dark:bg-gray-600 dark:group-hover:bg-gray-500"
      >
        <IconThumbUp class="h-6 w-6" />
      </ButtonIcon>
      <div
        class="ml-4 font-sans font-bold group-hover:text-primary dark:text-gray-200 dark:group-hover:text-white"
      >
        我按讚的文章
      </div>
    </router-link>
  </div>
</template>
