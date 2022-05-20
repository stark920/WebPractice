<script setup lang="ts">
import { ref, toRaw } from 'vue';
import UserInfo from './UserInfo.vue';
import IconThumbUp from './icons/IconThumbUp.vue';
import AvatarIcon from './AvatarIcon.vue';
import IconLoad from './icons/IconLoad.vue';
import FacebookImgPeek from './FacebookImgPeek.vue';
import { apiPost, checkToken } from '@/utils/axiosApi';

interface comment {
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
  comments?: comment[];
}>();

const msg = toRaw(props.comments);
// const like = toRaw(props.likes);

const innerComments = ref(msg);
// const innerLikes = ref(like);

const sendingComment = ref(false);
const commentContent = ref('');

function sendComment() {
  const content = commentContent.value.trim();

  if (content.length < 1) return;
  if (!checkToken) return;

  sendingComment.value = true;

  apiPost
    .comment(`${props.id}`, { content })
    .then((res) => {
      sendingComment.value = false;
      commentContent.value = '';
      innerComments.value = res.data.data.comments;
    })
    .catch(() => {
      sendingComment.value = false;
      commentContent.value = '';
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
          v-model="commentContent"
        />
        <div
          @click="sendComment"
          class="flex h-full cursor-pointer items-center justify-center border-l-2 border-black bg-primary px-4 text-white dark:border-gray-600"
          :class="{ 'bg-warn text-black': sendingComment }"
        >
          留言
          <IconLoad
            v-show="sendingComment"
            class="ml-2 h-4 w-4 animate-spin"
          ></IconLoad>
        </div>
      </div>
    </div>

    <div
      v-for="comment of innerComments"
      class="mt-4 rounded-lg bg-bg-light p-4 dark:border-gray-500 dark:bg-gray-800"
      :key="comment._id"
    >
      <UserInfo
        :size="40"
        :img-url="comment.user.avatar"
        :title="comment.user.name"
        :subtitle="toLocaleDate(comment.createdAt)"
      ></UserInfo>
      <div class="ml-[calc(40px+1rem)] whitespace-pre-wrap">
        {{ comment.content }}
      </div>
    </div>
  </div>
</template>
