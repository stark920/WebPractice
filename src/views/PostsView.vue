<script setup lang="ts">
import axios from 'axios';
import IconSearch from '../components/icons/IconSearch.vue';
import PostCard from '../components/PostCard.vue';
import EmptyCard from '../components/EmptyCard.vue';
import { onMounted, reactive, ref } from 'vue';
import SwiperImgs from '../components/SwiperImgs.vue';

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

const lightBox = reactive({
  isShow: false,
  images: [''],
  toggleShow(show: boolean, data: Array<string>) {
    lightBox.isShow = show;
    lightBox.images = data;
  },
});
</script>

<template>
  <SwiperImgs
    @close-light-box="lightBox.toggleShow(false, [''])"
    v-if="lightBox.isShow"
    :images="lightBox.images"
  ></SwiperImgs>

  <div class="mb-4 flex flex-wrap justify-between gap-x-4 gap-y-2">
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

  <template v-if="posts.length === 0">
    <EmptyCard></EmptyCard>
  </template>

  <template v-else>
    <div class="mb-[100px]">
      <PostCard
        v-for="post of posts"
        :key="post._id"
        @show-light-box="lightBox.toggleShow(true, getImagesUrl(post.images))"
        :name="post.user.name"
        :createdAt="post.createdAt"
        :content="post.content"
        :avatar-url="post.user.avatar"
        :imgUrl="getImagesUrl(post.images)"
        :messages="post.messages"
      />
    </div>
  </template>
</template>
