<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
const router = useRouter();
const user = useUserStore();

const signIn = reactive({
  isSending: false,
  email: '',
  password: '',
  loginResult: '',
  checkEmail: () => {
    if (signIn.email === '') return;
    if (!signIn.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      return '信箱格式不正確';
    }
    return;
  },
  checkPassword: () => {
    if (signIn.password === '') return;
    if (signIn.password.indexOf(' ') > -1) {
      return '密碼不可包含空白字元';
    }
    if (signIn.password.length < 8 || signIn.password.length > 20) {
      return '密碼需輸入 8~20 個字元';
    }
    return;
  },
  checkContent: () => {
    if (signIn.email && signIn.password) {
      if (!signIn.checkEmail() && !signIn.checkPassword()) {
        return true;
      }
    }
    return false;
  },
  reset: () => {
    signIn.isSending = false;
    signIn.email = '';
    signIn.password = '';
  },
});

function postSignIn() {
  if (!signIn.checkContent()) return;

  axios
    .post('https://enigmatic-reef-71098.herokuapp.com/users/sign_in', {
      email: signIn.email.toLowerCase(),
      password: signIn.password,
    })
    .then((res) => {
      localStorage.setItem('metaWall', res.data.data.token);
      user.id = res.data.data._id;
      user.name = res.data.data.name;
      user.avatar = res.data.data.avatar;
      signIn.reset();
      router.replace({ name: 'home' });
    })
    .catch((error) => {
      signIn.reset();
      signIn.loginResult = error.response.data.message.toString();
      window.setTimeout(() => {
        signIn.loginResult = '';
      }, 2000);
    });
}
</script>

<template>
  <p class="text-center font-sans text-2xl font-bold">到元宇宙展開全新社交圈</p>
  <div class="grid px-9 pt-9 font-azeret" @keyup.enter.stop="postSignIn()">
    <input
      class="custom-border focus:border-primary dark:text-black"
      type="email"
      placeholder="Email"
      v-model="signIn.email"
      @input="signIn.email = signIn.email.toLowerCase()"
    />
    <input
      class="custom-border mt-4 focus:border-primary dark:text-black"
      type="password"
      placeholder="Password"
      v-model="signIn.password"
    />
    <p class="mt-4 text-center text-alert">{{ signIn.checkEmail() }}</p>
    <p class="text-center text-alert">{{ signIn.checkPassword() }}</p>
    <p class="text-center text-alert">{{ signIn.loginResult }}</p>
    <button
      type="button"
      :class="{
        'primary-color border-black': signIn.checkContent(),
        'cursor-not-allowed border-gray-500 bg-gray-400 text-white':
          !signIn.checkContent(),
        'cursor-wait': signIn.isSending,
      }"
      class="custom-border mt-8 rounded-lg py-2 shadow-sm shadow-black"
      :disabled="!signIn.checkContent() || signIn.isSending"
      @click="postSignIn()"
    >
      登入
    </button>
    <Router-link to="/signUp" class="mx-auto mt-2 inline-block p-1"
      >註冊帳號</Router-link
    >
  </div>
</template>
