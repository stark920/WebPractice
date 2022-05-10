<script setup lang="ts">
import TitleCard from '../components/TitleCard.vue';
import IconTrash from '../components/icons/IconTrash.vue';
import IconLoad from '../components/icons/IconLoad.vue';
import SwiperImgs from '../components/SwiperImgs.vue';
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import { reactive, ref } from 'vue';

interface posts {
  content: string;
  images: Blob[];
  blobUrls: string[];
  isUploading: boolean;
  isSending: boolean;
}

const post: posts = reactive({
  content: '',
  images: [],
  blobUrls: [],
  isUploading: false,
  isSending: false,
});

function resetPost() {
  post.content = '';
  post.images.length = 0;
  post.blobUrls.length = 0;
}

function checkPostContent() {
  return post.content.length > 0 && !post.isUploading ? true : false;
}

const uploadImages = ref<HTMLInputElement | null>();
const allowImageTypes = 'image/jpg, image/jpeg, image/png';
const alertMessage = ref('');

async function sendPost() {
  if (!checkPostContent()) return;

  post.isSending = true;

  const data = await createPostFormData();

  const option = {
    method: 'post',
    url: 'http://127.0.0.1:3005/posts',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('metaWall')}`,
    },
    data,
  };

  axios(option)
    .then(() => {
      post.isSending = false;
      resetPost();
      uploadImages.value = null;
      window.alert('貼文上傳成功！');
    })
    .catch(() => {
      alertMessage.value = '貼文上傳失敗，請稍後再試！';
    });
}

async function createPostFormData() {
  const form = new FormData();

  form.append('content', post.content);

  for (const image of post.images) {
    await form.append('image', image);
  }
  return form;
}

async function handleImageUpload() {
  if (!uploadImages.value?.files) return;

  post.isUploading = true;

  const imageFiles = uploadImages.value.files;

  for (const imageFile of imageFiles) {
    if (allowImageTypes.indexOf(imageFile.type) < 0) {
      alertMessage.value = `圖片格式錯誤，僅限 ${allowImageTypes
        .replace(/image\//g, '')
        .toUpperCase()} 圖片`;
      return;
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      post.images.push(compressedFile);
      post.blobUrls.push(blobToUrl(compressedFile));
    } catch (error) {
      alertMessage.value = '圖片異常，無法正確壓縮';
    }
  }
  post.isUploading = false;
}

function blobToUrl(blob: Blob) {
  return URL.createObjectURL(blob);
}

function deleteImage(index: number) {
  URL.revokeObjectURL(post.blobUrls[index]);
  post.blobUrls.splice(index, 1);
  post.images.splice(index, 1);
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

  <TitleCard title="張貼動態" />

  <div
    class="custom-border dark:dark-card shadow-black-3px mt-8 rounded-lg bg-white p-8"
  >
    <div>
      <label for="content">貼文內容</label>
      <textarea
        class="custom-border mt-1 h-[200px] w-full resize-none focus:border-primary dark:bg-gray-400 dark:text-black"
        id="content"
        v-model="post.content"
        :disabled="post.isSending"
      />
    </div>

    <div class="mt-4">
      <label
        class="inline-block cursor-pointer bg-black py-1 px-8 text-white"
        for="uploadImages"
        >上傳圖片</label
      >
      <input
        @change="handleImageUpload()"
        class="hidden"
        type="file"
        ref="uploadImages"
        id="uploadImages"
        :accept="allowImageTypes"
        :disabled="post.isSending"
        multiple
      />
    </div>

    <div class="mt-4">
      <div
        class="custom-border grid gap-[2px] bg-gray-800"
        :class="{
          'grid-cols-2': post.images.length > 1,
        }"
      >
        <div
          v-show="post.images.length === 0"
          class="col-span-full bg-white py-1 text-center text-sm text-gray-600 dark:bg-gray-400"
        >
          尚未上傳圖片（上傳的圖片會壓縮至 1 MB 以下）
        </div>
        <div
          v-for="(imgUrl, index) of post.blobUrls"
          :key="index"
          class="relative bg-white dark:bg-gray-400"
        >
          <img
            @click.self="lightBox.toggleShow(true, [imgUrl])"
            class="aspect-video w-full cursor-pointer object-contain hover:brightness-110"
            :src="imgUrl"
          />
          <div
            @click="deleteImage(index)"
            class="absolute top-1 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,.2)] text-white hover:bg-[rgba(0,0,0,.4)]"
          >
            <IconTrash class="h-4 w-4">
              <title>刪除圖片</title>
            </IconTrash>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8 text-center text-alert">
      {{ alertMessage }}
    </div>
    <div class="mt-4">
      <button
        type="button"
        :class="{
          'primary-color border-black': checkPostContent(),
          'cursor-not-allowed border-gray-500 bg-gray-400': !checkPostContent(),
          'cursor-wait': post.isSending,
        }"
        :disabled="!checkPostContent()"
        class="mx-auto flex w-full max-w-[300px] items-center justify-center rounded-lg border-2 py-3 text-white"
        @click="sendPost"
      >
        <IconLoad v-show="post.isSending" class="mr-2 animate-spin"></IconLoad>
        <span>{{ post.isSending ? '貼文上傳中，請稍候' : '送出貼文' }}</span>
      </button>
    </div>
  </div>
</template>
