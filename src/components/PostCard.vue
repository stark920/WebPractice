<script setup lang="ts">
import { ref, toRaw } from 'vue';
import UserInfo from './UserInfo.vue';
import IconThumbUp from './icons/IconThumbUp.vue';
import AvatarIcon from './AvatarIcon.vue';
import IconLoad from './icons/IconLoad.vue';
import FacebookImgPeek from './FacebookImgPeek.vue';
import axios from 'axios';

interface message {
  _id: string;
  createdAt: string;
  content: string;
  user: {
    name: string;
    avatar?: string;
  };
}

const props = defineProps<{
  id: string;
  avatar?: string;
  name: string;
  createdAt: string;
  content: string;
  images?: Array<string>;
  likes?: Array<string>;
  messages?: message[];
}>();

const msg = toRaw(props.messages);
const innerMessages = ref(msg);

const sendingMessage = ref(false);
const messageContent = ref('');

function sendMessage() {
  const content = messageContent.value.trim();
  if (content.length < 1) return;

  sendingMessage.value = true;

  axios({
    method: 'post',
    url: `http://127.0.0.1:3005/posts/${props.id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('metaWall')}`,
    },
    data: { content },
  })
    .then((res) => {
      sendingMessage.value = false;
      messageContent.value = '';
      innerMessages.value = res.data.data.messages;
    })
    .catch(() => {
      sendingMessage.value = false;
      messageContent.value = '';
      window.alert('新增留言失敗，請稍後再試');
    });
}

function toLocaleDate(date: string | undefined) {
  if (!date) return;
  const d = new Date(date);
  return d.toLocaleString();
}
</script>

<template>
  <div
    class="custom-border dark:dark-card shadow-black-3px mb-4 w-full rounded-lg bg-white p-3 md:p-6"
  >
    <UserInfo
      :size="45"
      :avatar-url="avatar"
      :title="name"
      :subtitle="toLocaleDate(createdAt)"
    ></UserInfo>

    <pre class="my-4 whitespace-pre-wrap">{{ content }}</pre>

    <FacebookImgPeek :images="images"></FacebookImgPeek>

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
          v-model="messageContent"
        />
        <div
          @click="sendMessage"
          class="flex h-full cursor-pointer items-center justify-center border-l-2 border-black bg-primary px-4 text-white dark:border-gray-600"
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
      v-for="message of innerMessages"
      class="mt-4 rounded-lg bg-bg-light p-4 dark:border-gray-500 dark:bg-gray-800"
      :key="message._id"
    >
      <UserInfo
        :size="40"
        :img-url="message.user.avatar"
        :title="message.user.name"
        :subtitle="toLocaleDate(message.createdAt)"
      ></UserInfo>
      <div class="ml-[calc(40px+1rem)] whitespace-pre-wrap">
        {{ message.content }}
      </div>
    </div>
  </div>
</template>
