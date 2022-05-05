<script setup lang="ts">
import axios from 'axios';
import IconSearch from '../components/icons/IconSearch.vue';
import PostCard from '../components/PostCard.vue';
import EmptyCard from '../components/EmptyCard.vue';
import { onMounted, ref } from 'vue';
import SwiperImgs from '../components/SwiperImgs.vue';

let isLightBox = ref(false);
let posts = ref([]);
let lightBoxImages = ref([]);
const toggleLightBox = (show: boolean, data?: Array<string>) => {
  if (show) {
    isLightBox.value = true;
    lightBoxImages.value = data;
  } else {
    isLightBox.value = false;
    lightBoxImages.value = [];
  }
};

onMounted(() => {
  // axios.get('https://teamwork02.herokuapp.com/posts').then((res) => {
  //   posts.value = res.data.data.data;
  // });
});
</script>

<template>
  <SwiperImgs
    @close-light-box="toggleLightBox(false)"
    v-if="isLightBox"
    :images="lightBoxImages"
  ></SwiperImgs>
  <div class="mb-4 flex flex-wrap justify-between gap-x-4 gap-y-2">
    <select
      class="dark:dark-card custom-border w-full px-3 py-1.5 font-azeret focus:border-primary lg:w-3/12"
    >
      <option value="new" selected>最新貼文</option>
      <option value="hot">熱門貼文</option>
    </select>
    <div class="dark:dark-card custom-border flex flex-1 items-center">
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

  <EmptyCard></EmptyCard>
  <PostCard
    @show-light-box="
      toggleLightBox(true, [
        'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-6/241024648_4709451582407909_7771307663622385679_n.jpg?stp=dst-jpg_p180x540&_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=L6nk3BNtnLUAX-au_6S&_nc_ht=scontent.fkhh1-2.fna&oh=00_AT9DvTMExuWW4AldgpGfyGbCXGegIWYTxjIxNLIH0LHPgQ&oe=6276A7C2',
        'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-6/241024648_4709451582407909_7771307663622385679_n.jpg?stp=dst-jpg_p180x540&_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=L6nk3BNtnLUAX-au_6S&_nc_ht=scontent.fkhh1-2.fna&oh=00_AT9DvTMExuWW4AldgpGfyGbCXGegIWYTxjIxNLIH0LHPgQ&oe=6276A7C2',
        'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-6/241024648_4709451582407909_7771307663622385679_n.jpg?stp=dst-jpg_p180x540&_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=L6nk3BNtnLUAX-au_6S&_nc_ht=scontent.fkhh1-2.fna&oh=00_AT9DvTMExuWW4AldgpGfyGbCXGegIWYTxjIxNLIH0LHPgQ&oe=6276A7C2',
      ])
    "
    name="abccc"
    createdAt="35734784"
    content="1dhoij;oe"
    avatar-url="124124"
    :imgUrl="[
      'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-6/241024648_4709451582407909_7771307663622385679_n.jpg?stp=dst-jpg_p180x540&_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=L6nk3BNtnLUAX-au_6S&_nc_ht=scontent.fkhh1-2.fna&oh=00_AT9DvTMExuWW4AldgpGfyGbCXGegIWYTxjIxNLIH0LHPgQ&oe=6276A7C2',
      'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-6/241024648_4709451582407909_7771307663622385679_n.jpg?stp=dst-jpg_p180x540&_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=L6nk3BNtnLUAX-au_6S&_nc_ht=scontent.fkhh1-2.fna&oh=00_AT9DvTMExuWW4AldgpGfyGbCXGegIWYTxjIxNLIH0LHPgQ&oe=6276A7C2',
      'https://scontent.fkhh1-2.fna.fbcdn.net/v/t39.30808-6/241024648_4709451582407909_7771307663622385679_n.jpg?stp=dst-jpg_p180x540&_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=L6nk3BNtnLUAX-au_6S&_nc_ht=scontent.fkhh1-2.fna&oh=00_AT9DvTMExuWW4AldgpGfyGbCXGegIWYTxjIxNLIH0LHPgQ&oe=6276A7C2',
    ]"
    :likes="[124124, 216612]"
    :messages="[
      {
        id: 24247,
        name: '3q4747',
        avatarUrl: 'erjtertj',
        createdAt: 'weurwturwtu',
        content: 'rswtjrjstsrtj',
      },
      {
        id: 24247,
        name: '3q4747',
        avatarUrl: 'erjtertj',
        createdAt: 'weurwturwtu',
        content: 'rswtjrjstsrtj',
      },
    ]"
  />
  <PostCard />
  <PostCard />
  <PostCard />
  <PostCard />
  <PostCard />
  <PostCard />
  <PostCard />
</template>
