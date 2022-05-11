<script setup lang="ts">
import axios from 'axios';
import IconSearch from '../components/icons/IconSearch.vue';
import PostCard from '../components/PostCard.vue';
import EmptyCard from '../components/EmptyCard.vue';
import { onMounted, ref } from 'vue';
import PulsePostCard from '../components/PulsePostCard.vue';
import SwiperImgs from '../components/SwiperImgs.vue';

const postsLoading = ref(true);

interface image {
  url: string;
}
interface message {
  _id: string;
  name: string;
  avatarUrl: string;
  createdAt: string;
  content: string;
}
interface user {
  _id: string;
  name: string;
  avatar: string | undefined;
}
interface post {
  _id: string;
  user: user;
  content: string;
  images: Array<image | null>;
  createdAt: string;
  likes: Array<string | null>;
  messages?: Array<message>;
}

let posts = ref<post[]>([]);

onMounted(() => {
  axios({
    method: 'get',
    url: 'https://enigmatic-reef-71098.herokuapp.com/posts',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('metaWall')}`,
    },
  }).then((res) => {
    posts.value = res.data.data;
    postsLoading.value = false;
  });
});

function getImagesUrl(images: Array<image | null>) {
  if (!images) return;

  const urls: string[] = [];

  images.forEach((image: image | null) => {
    if (image?.url) urls.push(image.url);
  });

  return urls;
}
</script>

<template>
  <SwiperImgs></SwiperImgs>

  <div class="mb-4 flex w-full flex-wrap justify-between gap-x-4 gap-y-2">
    <select
      class="dark:dark-card custom-border w-full px-3 py-1.5 font-azeret focus:border-primary lg:w-3/12"
    >
      <option value="new" selected>最新貼文</option>
      <option value="hot">熱門貼文</option>
    </select>
    <div
      class="dark:dark-card custom-border flex flex-1 items-center bg-primary"
    >
      <input
        type="search"
        class="flex-1 border-0 px-3 py-1.5 focus:border-primary dark:bg-gray-700"
        placeholder="搜尋貼文"
      />
      <div
        class="flex h-full w-12 cursor-pointer items-center justify-center border-l-2 border-black bg-primary text-white dark:border-gray-600"
      >
        <IconSearch />
      </div>
    </div>
  </div>

  <div class="w-full" v-if="!postsLoading">
    <EmptyCard
      v-if="posts.length === 0"
      content="目前尚無動態，新增一則貼文吧！"
    ></EmptyCard>

    <template v-else>
      <PostCard
        v-for="post of posts"
        :key="post._id"
        :name="post.user.name"
        :createdAt="post.createdAt"
        :content="post.content"
        :avatar-url="post.user.avatar"
        :imgUrl="getImagesUrl(post.images)"
        :messages="post.messages"
      />
      <EmptyCard content="沒有新的貼文了，新增一則貼文吧！"></EmptyCard>
    </template>
  </div>
  <div class="w-full" v-show="postsLoading">
    <PulsePostCard></PulsePostCard>
    <PulsePostCard></PulsePostCard>
  </div>
  <div class="block h-[100px] w-full md:h-0"></div>
</template>
