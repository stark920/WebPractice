<script setup lang="ts">
import IconLoad from '@/components/icons/IconLoad.vue';
import { reactive } from 'vue';
import { computed } from '@vue/reactivity';
import { apiUser } from '@/utils/axiosApi';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
const router = useRouter();
const user = useUserStore();

const signUp = reactive({
  isSending: false,
  name: '',
  email: '',
  password: '',
  checkName: computed(() => {
    if (signUp.name === '') return;
    if (signUp.name.indexOf(' ') > -1) {
      return '暱稱不可包含空白字元';
    }
    const name = signUp.name.length;
    if (name < 2 || name > 10) {
      return '暱稱需輸入 2~10 個字元';
    }
    return;
  }),
  checkEmail: computed(() => {
    if (signUp.email === '') return;
    if (!signUp.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      return '信箱格式不正確';
    }
    return;
  }),
  checkPassword: computed(() => {
    if (signUp.password === '') return;
    if (signUp.password.indexOf(' ') > -1) {
      return '密碼不可包含空白字元';
    }
    if (signUp.password.length < 8 || signUp.password.length > 20) {
      return '密碼需輸入 8~20 個字元';
    }
    return;
  }),
  checkContent: computed(() => {
    if (signUp.name && signUp.email && signUp.password) {
      if (!signUp.checkName && !signUp.checkEmail && !signUp.checkPassword) {
        return true;
      }
    }
    return false;
  }),
  reset() {
    this.isSending = false;
    this.name = '';
    this.email = '';
    this.password = '';
  },
});

const postSignUp = () => {
  if (!signUp.checkContent) return;

  signUp.isSending = true;

  apiUser
    .signUp({
      name: signUp.name.trim(),
      email: signUp.email.toLowerCase(),
      password: signUp.password.trim(),
    })
    .then((res) => {
      localStorage.setItem('metaWall', res.data.data.token);
      user.id = res.data.data._id;
      user.name = res.data.data.name;
      user.avatar = res.data.data.avatar;
      signUp.reset();
      window.alert('註冊成功');
      router.push({ name: 'home' });
    })
    .catch((error) => {
      signUp.reset();
      window.alert(error.response.data.message);
    });
};
</script>

<template>
  <p class="text-center font-sans text-2xl font-bold">註冊</p>
  <div class="grid px-9 pt-9 font-azeret" @keyup.enter.stop="postSignUp">
    <input
      class="custom-border focus:border-primary dark:text-black"
      type="text"
      placeholder="暱稱"
      v-model="signUp.name"
    />
    <span class="text-alert">{{ signUp.checkName }}</span>
    <input
      class="custom-border mt-4 focus:border-primary dark:text-black"
      type="email"
      placeholder="Email"
      v-model="signUp.email"
      @input="signUp.email = signUp.email.toLowerCase()"
    />
    <span class="text-alert">{{ signUp.checkEmail }}</span>
    <input
      class="custom-border mt-4 focus:border-primary dark:text-black"
      type="password"
      placeholder="Password"
      v-model="signUp.password"
    />
    <span class="text-alert">{{ signUp.checkPassword }}</span>
    <button
      type="button"
      :class="{
        'primary-color border-black': signUp.checkContent,
        'cursor-not-allowed border-gray-500 bg-gray-400 text-white':
          !signUp.checkContent,
        'cursor-wait': signUp.isSending,
      }"
      class="custom-border mt-8 flex items-center justify-center rounded-lg py-3 shadow-sm shadow-black"
      :disabled="!signUp.checkContent || signUp.isSending"
      @click="postSignUp"
    >
      <span>
        {{ signUp.isSending ? '註冊中...' : '註冊' }}
      </span>
      <IconLoad v-show="signUp.isSending" class="ml-1 animate-spin"></IconLoad>
    </button>
    <Router-link to="/" class="mx-auto mt-2 inline-block p-1">登入</Router-link>
  </div>
</template>
