<script setup lang="ts">
import UserInfo from './UserInfo.vue';
import IconThumbUp from './icons/IconThumbUp.vue';
import AvatarIcon from './AvatarIcon.vue';
import FacebookImgPeek from './FacebookImgPeek.vue';
</script>

<template>
  <div
    class="custom-border dark:dark-card shadow-black-3px mb-4 w-full animate-pulse rounded-lg bg-white p-6"
  >
    <UserInfo></UserInfo>

    <pre class="my-4"></pre>

    <FacebookImgPeek></FacebookImgPeek>

    <div class="mt-4 flex items-center">
      <IconThumbUp class="h-5 w-5 cursor-pointer"></IconThumbUp>
      <span class="ml-1.5"></span>
    </div>

    <div class="mt-4 flex justify-between gap-x-2">
      <AvatarIcon :size="40" class="self-center"></AvatarIcon>
      <div class="dark:dark-card custom-border flex flex-1 items-center">
        <input
          type="search"
          class="flex-1 border-0 px-3 py-1.5 focus:border-primary dark:bg-gray-700"
          placeholder="留言..."
        />
        <div
          class="flex h-full w-2/12 cursor-pointer items-center justify-center border-l-2 border-black bg-primary text-white dark:border-gray-600"
        >
          留言
        </div>
      </div>
    </div>

    <div
      class="mt-4 rounded-lg bg-bg-light p-4 dark:border-gray-500 dark:bg-gray-800"
    >
      <UserInfo :size="40"></UserInfo>
      <div class="ml-[calc(40px+1rem)]"></div>
    </div>
  </div>
</template>
