<script setup lang="ts">
import TitleCard from '@/components/TitleCard.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconLoad from '@/components/icons/IconLoad.vue';
import SwiperImgs from '@/components/SwiperImgs.vue';
import imageCompression from 'browser-image-compression';
import { reactive, ref } from 'vue';
import { useLightBoxStore } from '@/stores/lightBox';
import { computed } from '@vue/reactivity';
import { apiPost, checkToken } from '@/utils/axiosApi';

const lightBox = useLightBoxStore();

interface posts {
  content: string;
  images: Blob[];
  blobUrls: string[];
  isUploading: boolean;
  isSending: boolean;
  reset: () => undefined;
}

const post: posts = reactive({
  content: '',
  images: [],
  blobUrls: [],
  isUploading: false,
  isSending: false,
  reset() {
    this.content = '';
    this.images.length = 0;
    this.blobUrls.length = 0;
    return undefined;
  },
});

const checkPost = computed(() => {
  if (post.content.trim().length < 1) return false;
  if (post.isUploading) return false;
  return true;
});

const uploadImages = ref<HTMLInputElement | null>();
const allowImageTypes = 'image/jpg, image/jpeg, image/png';
const alertMessage = ref('');

async function sendPost() {
  if (!checkPost) return;

  if (!checkToken) return;

  post.isSending = true;

  const data = await createPostFormData();

  apiPost
    .upload(data)
    .then(() => {
      post.isSending = false;
      post.reset();
      window.alert('貼文上傳成功！');
    })
    .catch((err) => {
      console.log(err);
      alertMessage.value = '貼文上傳失敗，請稍後再試！';
    });
}

async function createPostFormData() {
  const form = new FormData();

  form.append('content', post.content);

  for (const image of post.images) {
    await form.append('images', image);
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
  uploadImages.value = null;
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

function showLightBox(data: Array<string>) {
  lightBox.show = true;
  lightBox.images = data;
}
</script>

<template>
  <SwiperImgs></SwiperImgs>

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
        @change="handleImageUpload"
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
          @click.stop="showLightBox(post.blobUrls)"
        >
          <img
            class="aspect-video w-full cursor-pointer object-contain hover:brightness-110"
            :src="imgUrl"
          />
          <div
            @click.stop="deleteImage(index)"
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
          'primary-color border-black': checkPost,
          'cursor-not-allowed border-gray-500 bg-gray-400': !checkPost,
          'cursor-wait': post.isSending,
        }"
        :disabled="!checkPost"
        class="mx-auto flex w-full max-w-[300px] items-center justify-center rounded-lg border-2 py-3 text-white"
        @click="sendPost"
      >
        <IconLoad v-show="post.isSending" class="mr-2 animate-spin"></IconLoad>
        <span>{{ post.isSending ? '貼文上傳中，請稍候' : '送出貼文' }}</span>
      </button>
    </div>
  </div>
</template>
