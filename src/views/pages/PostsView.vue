<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import PostCard from '@/components/PostCard.vue'
import EmptyCard from '@/components/EmptyCard.vue'
import PulsePostCard from '@/components/PulsePostCard.vue'
import SwiperImgs from '@/components/SwiperImgs.vue'
import { onMounted, ref } from 'vue'
import { apiPost, checkToken } from '@/utils/axiosApi'

const postsLoading = ref(true)

interface image {
  _id: string
  url: string
}
interface user {
  _id: string
  name: string
  avatar: string | undefined
}
interface comment {
  _id: string
  createdAt: string
  content: string
  user: user
}
interface post {
  _id: string
  user: user
  content: string
  images: Array<image>
  likesNum: number
  likes: Array<string>
  comments: Array<comment>
  createdAt: string
  updatedAt: string
}

const posts = ref<post[]>([])

onMounted(() => {
  if (!checkToken) return

  apiPost.getAll('').then((res) => {
    posts.value = res.data.data
    postsLoading.value = false
  })
})

function getUrl(images: Array<image>) {
  if (images.length === 0) return []
  return images.map((img) => img.url)
}
</script>

<template>
  <SwiperImgs></SwiperImgs>

  <div class="mb-[100px] w-full md:mb-0">
    <div
      class="mb-4 flex flex-wrap justify-between gap-x-0 gap-y-2 md:gap-x-4 md:gap-y-0">
      <select
        class="dark:dark-card custom-border w-full px-3 py-1.5 font-azeret focus:border-primary md:w-3/12">
        <option value="new" selected>最新貼文</option>
        <option value="hot">熱門貼文</option>
      </select>
      <div
        class="dark:dark-card custom-border flex flex-1 items-center bg-primary">
        <input
          type="search"
          class="flex-1 border-0 px-3 py-1.5 focus:border-primary dark:bg-gray-700"
          placeholder="搜尋貼文" />
        <div
          class="flex h-full cursor-pointer items-center justify-center border-l-2 border-black bg-primary px-3 text-white dark:border-gray-600">
          <IconSearch />
        </div>
      </div>
    </div>

    <div v-show="postsLoading">
      <PulsePostCard></PulsePostCard>
      <PulsePostCard></PulsePostCard>
    </div>

    <div v-show="!postsLoading">
      <EmptyCard
        v-if="posts.length === 0"
        content="目前尚無動態，新增一則貼文吧！"></EmptyCard>

      <template v-for="po of posts" v-else :key="po._id">
        <PostCard
          :id="po._id"
          :name="po.user.name"
          :created-at="po.createdAt"
          :content="po.content"
          :avatar="po.user.avatar"
          :images="getUrl(po.images)"
          :comments="po.comments" />
      </template>

      <EmptyCard content="沒有其他貼文了！"></EmptyCard>
    </div>
  </div>
</template>
