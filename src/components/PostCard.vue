<script setup lang="ts">
import { ref } from 'vue';
import UserInfo from './UserInfo.vue';
import IconThumbUp from './icons/IconThumbUp.vue';
import AvatarIcon from './AvatarIcon.vue';
import IconLoad from './icons/IconLoad.vue';
import FacebookImgPeek from './FacebookImgPeek.vue';

defineProps<{
  avatarUrl?: string;
  name?: string;
  createdAt?: string;
  content?: string;
  imgUrl?: Array<string>;
  likes?: Array<string>;
  messages?: {
    _id: string;
    name: string;
    avatarUrl: string;
    createdAt: string;
    content: string;
  }[];
}>();

const sendingMessage = ref(false);

function sendMessage() {
  sendingMessage.value = true;
  setTimeout(() => {
    sendingMessage.value = false;
  }, 1000);
}

function toLocalDate(date: string | undefined) {
  if (!date) return;
  const d = new Date(date);
  return d.toLocaleString();
}
</script>

<template>
  <div
    class="custom-border dark:dark-card shadow-black-3px mb-4 rounded-lg bg-white p-6"
  >
    <UserInfo
      :size="45"
      :avatar-url="avatarUrl"
      :title="name"
      :subtitle="toLocalDate(createdAt)"
    ></UserInfo>

    <pre class="my-4">{{ content }}</pre>

    <FacebookImgPeek
      @click="$emit('showLightBox')"
      :img-url="imgUrl"
    ></FacebookImgPeek>

    <div class="mt-4 flex items-center">
      <IconThumbUp
        class="h-5 w-5 cursor-pointer"
        :class="{
          'text-primary dark:text-white': likes,
          'text-gray-400': !likes,
        }"
      ></IconThumbUp>
      <span
        class="ml-1.5"
        :class="{
          'text-primary dark:text-white': likes,
          'text-gray-400': !likes,
        }"
        >{{ likes?.length || '成為第一個按讚的朋友' }}</span
      >
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
          @click="sendMessage"
          class="flex h-full w-2/12 cursor-pointer items-center justify-center border-l-2 border-black bg-primary text-white dark:border-gray-600"
          :class="{ 'bg-warn text-black': sendingMessage }"
        >
          留言
          <IconLoad
            v-show="sendingMessage"
            class="ml-2 h-4 w-4 animate-spin"
          ></IconLoad>
        </div>
      </div>
    </div>

    <div
      v-for="message of messages"
      class="mt-4 rounded-lg bg-bg-light p-4 dark:border-gray-500 dark:bg-gray-800"
      :key="message._id"
    >
      <UserInfo
        :size="40"
        :img-url="message.avatarUrl"
        :title="message.name"
        :subtitle="message.createdAt"
      ></UserInfo>
      <div class="ml-[calc(40px+1rem)]">{{ message.content }}</div>
    </div>
  </div>
</template>
