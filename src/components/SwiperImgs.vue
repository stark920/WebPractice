<script setup lang="ts">
import IconPlus from './icons/IconPlus.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useLightBoxStore } from '@/stores/lightBox';

const lightBox = useLightBoxStore();
const modules = [Navigation, Pagination];
</script>

<template>
  <swiper
    :preloadImages="false"
    :init="false"
    :modules="modules"
    :slides-per-view="1"
    :navigation="true"
    :centeredSlides="true"
    :pagination="{ clickable: true }"
    :class="{ fixed: lightBox.show, hidden: !lightBox.show }"
    class="top-0 bottom-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.8)]"
    @click.self="lightBox.close()"
  >
    <div
      class="absolute top-4 left-4 z-50 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,.1)] hover:bg-[rgba(255,255,255,.2)]"
      @click.stop="lightBox.close()"
    >
      <icon-plus class="rotate-45 select-none text-gray-200">
        <title>關閉</title>
      </icon-plus>
    </div>
    <swiper-slide v-for="(image, index) of lightBox.images" :key="index">
      <img :src="image" class="select-none" />
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: rgba(0, 0, 0, 0.2);

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>
