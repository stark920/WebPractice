<script setup lang="ts">
import AvatarIcon from '../../components/AvatarIcon.vue';
import DarkSwitch from '../../components/DarkSwitch.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
const router = useRouter();
const user = useUserStore();
const userName = user.userData.name;

function signOut() {
  localStorage.removeItem('metaWall');
  user.clear();
  router.push({ name: 'signIn' });
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 border-b-2 border-black bg-white dark:border-gray-500 dark:bg-gray-800"
  >
    <div
      class="mx-auto flex h-[60px] w-full max-w-screen-lg items-center justify-between px-2 dark:text-white lg:px-4"
    >
      <router-link
        to="/home"
        class="font-paytone text-[1.625rem] font-bold tracking-wide"
      >
        MetaWall
      </router-link>
      <div class="flex select-none items-center">
        <div class="mr-4">
          <DarkSwitch></DarkSwitch>
        </div>
        <div class="relative flex items-center">
          <AvatarIcon :size="30" class="mr-2" />
          <label
            for="sub-menu"
            class="border-b-2 border-black font-azeret font-bold dark:border-gray-300"
          >
            {{ userName }}
          </label>
          <input type="checkbox" class="peer hidden" id="sub-menu" />
          <div
            class="dark:dark-card custom-border absolute right-0 top-[calc(100%+0.5rem)] hidden w-[180px] text-center peer-checked:grid"
          >
            <router-link
              to="/profile"
              class="dark:dark-card bg-white py-2 hover:bg-bg-light dark:hover:bg-gray-800"
              >我的貼文牆</router-link
            >
            <router-link
              to="/profile/edit"
              class="dark:dark-card border-t-2 border-b-2 border-black bg-white py-2 hover:bg-bg-light dark:hover:bg-gray-800"
              >修改個人資料</router-link
            >
            <button
              type="button"
              class="dark:dark-card bg-white py-2 hover:bg-bg-light dark:hover:bg-gray-800"
              @click="signOut()"
            >
              登出
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
