<script setup lang="ts">
import axios from 'axios';
import IconSearch from '../components/icons/IconSearch.vue';
import PostCard from '../components/PostCard.vue';
import EmptyCard from '../components/EmptyCard.vue';
import { onMounted, reactive, ref } from 'vue';
import SwiperImgs from '../components/SwiperImgs.vue';

interface image {
  url: string;
  deleteHash: string;
}

interface post {
  _id: string;
  userID: string;
  content: string;
  images: Array<image | null>;
  createdAt: string;
  likes: Array<string | null>;
}

let posts = ref<post[]>([]);

onMounted(() => {
  const token = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('metaWall')}`,
    },
  };

  axios.get('http://127.0.0.1:3005/posts', token).then((res) => {
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

  <div v-if="posts.length === 0">
    <EmptyCard></EmptyCard>
  </div>

  <div v-else>
    <div>
      <PostCard
        v-for="post of posts"
        :key="post._id"
        @show-light-box="lightBox.toggleShow(true, getImagesUrl(post.images))"
        name="abccc"
        :createdAt="post.createdAt"
        :content="post.content"
        avatar-url="124124"
        :imgUrl="getImagesUrl(post.images)"
        :likes="post.likes"
        :messages="[
          // {
          //   id: 24247,
          //   name: '3q4747',
          //   avatarUrl: 'erjtertj',
          //   createdAt: 'weurwturwtu',
          //   content: 'rswtjrjstsrtj',
          // },
          // {
          //   id: 24247,
          //   name: '3q4747',
          //   avatarUrl: 'erjtertj',
          //   createdAt: 'weurwturwtu',
          //   content: 'rswtjrjstsrtj',
          // },
        ]"
      />
    </div>
  </div>
</template>
