<script setup lang="ts">
import HeaderViewVue from './home/HeaderView.vue'
import AsideView from './home/AsideView.vue'
import ToolBarView from './home/ToolBarView.vue'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

onBeforeMount(() => {
  if (localStorage.getItem('metaWall')) return

  router.replace({ name: 'signIn' })
})
</script>

<template>
  <HeaderViewVue />
  <main
    class="mx-auto flex max-w-full justify-between gap-x-0 px-4 pt-[calc(60px+2rem)] sm:max-w-screen-sm md:max-w-screen-md md:gap-x-4 lg:max-w-screen-lg">
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
