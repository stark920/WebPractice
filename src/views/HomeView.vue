<script setup lang="ts">
import HeaderViewVue from './home/HeaderView.vue';
import AsideView from './home/AsideView.vue';
import ToolBarView from './home/ToolBarView.vue';
</script>

<template>
  <HeaderViewVue />
  <main
    class="mx-auto flex w-full max-w-screen-lg justify-between px-2 pt-[calc(60px+2rem)] lg:gap-x-4 lg:px-4"
  >
    <article class="flex-1">
      <router-view />
    </article>
    <aside class="hidden w-[300px] lg:block">
      <AsideView />
    </aside>
  </main>
  <div class="lg:hidden">
    <ToolBarView />
  </div>
</template>
