<script setup lang="ts">
import DarkSwitch from '@/components/DarkSwitch.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
const router = useRouter();
const user = useUserStore();

if (user.name) {
  router.replace({ name: 'home' });
}
</script>

<template>
  <div class="fixed top-2 right-2">
    <DarkSwitch></DarkSwitch>
  </div>

  <main class="flex h-screen w-screen items-center justify-center">
    <div
      class="custom-border dark:dark-card sign-shadow flex w-11/12 max-w-[900px] items-center bg-white px-6 py-8 md:px-12 md:py-16"
    >
      <div class="hidden md:block">
        <img src="@/assets/login_page.svg" alt="login_banner" />
      </div>
      <div class="flex-1">
        <h1
          class="text-center font-paytone text-6xl tracking-wide text-primary dark:brightness-150"
        >
          MetaWall
        </h1>
        <Router-view></Router-view>
      </div>
    </div>
  </main>
</template>

<style scoped>
.sign-shadow {
  box-shadow: -8px 8px 0px #00040029;
}

.dark .sign-shadow {
  box-shadow: -8px 8px 0px #ffffff69;
}
</style>
