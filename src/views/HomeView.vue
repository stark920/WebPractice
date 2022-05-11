<script setup lang="ts">
import HeaderViewVue from './home/HeaderView.vue';
import AsideView from './home/AsideView.vue';
import ToolBarView from './home/ToolBarView.vue';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

onBeforeMount(() => {
  if (localStorage.getItem('metaWall')) return;

  router.replace({ name: 'signIn' });
});
</script>

<template>
  <HeaderViewVue />
  <main
    class="mx-auto flex w-full max-w-screen-lg justify-between gap-x-0 px-4 pt-[calc(60px+2rem)] md:gap-x-4"
  >
    <article class="flex-1">
      <router-view />
    </article>
    <aside class="hidden w-0 md:block md:w-4/12">
      <AsideView />
    </aside>
  </main>
  <div class="md:hidden">
    <ToolBarView />
  </div>
</template>
