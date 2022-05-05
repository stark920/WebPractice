<script setup lang="ts">
import TitleCard from '../components/TitleCard.vue';
import axios from 'axios';
import { ref } from 'vue';

const id = '8019811a2c2054a';
const token = 'e81e2fe3f248100fa53e74c23682c179a2e5bd04';
const album = 'sZoEJTk';

const settings: Record<string, boolean | object | string | FormData> = {
  async: true,
  crossDomain: true,
  processData: false,
  contentType: false,
  type: 'POST',
  url: 'https://api.imgur.com/3/image',
  headers: {
    Authorization: 'Bearer ' + token,
  },
  mimeType: 'multipart/form-data',
};

const uploadImage = ref<HTMLInputElement>();

function renderUploadImage() {
  if (uploadImage?.value) {
    const files = uploadImage.value.files;
    if (files?.length) {
      const form = new FormData();
      form.append('image', files[0]);
      form.append('title', files[0].name);
      form.append('album', album);

      settings.data = form;

      axios(settings).then((res) => console.log(res.data));
    }
  }
}
</script>

<template>
  <TitleCard title="張貼動態" />
  <div class="custom-border dark:dark-card mt-8 p-8 shadow-black">
    <div>
      <label for="content">貼文內容</label>
      <textarea
        class="custom-border mt-1 h-[200px] w-full resize-none focus:border-primary"
        id="content"
      />
    </div>
    <div class="mt-4">
      <label
        class="inline-block cursor-pointer bg-black py-1 px-8 text-white"
        for="uploadImage"
        >上傳圖片</label
      >
      <input
        @change="renderUploadImage"
        class="hidden"
        type="file"
        ref="uploadImage"
        id="uploadImage"
        multiple
      />
    </div>
    <div class="mt-4">
      <img class="max-w-full" src="" alt="" />
    </div>
  </div>
</template>
