<script setup lang="ts">
import IconLoad from './icons/IconLoad.vue'
import { reactive } from 'vue'
import { computed } from '@vue/reactivity'
import { apiUser } from '@/utils/axiosApi'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const router = useRouter()
const user = useUserStore()

const signIn = reactive({
  isSending: false,
  email: '',
  password: '',
  loginResult: '',
  checkEmail: computed(() => {
    if (signIn.email === '') return
    if (!signIn.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      return '信箱格式不正確'
    }
    return
  }),
  checkPassword: computed(() => {
    if (signIn.password === '') return
    if (signIn.password.indexOf(' ') > -1) {
      return '密碼不可包含空白字元'
    }
    if (signIn.password.length < 8 || signIn.password.length > 20) {
      return '密碼需輸入 8~20 個字元'
    }
    return
  }),
  checkContent: computed(() => {
    if (signIn.email && signIn.password) {
      if (!signIn.checkEmail && !signIn.checkPassword) {
        return true
      }
    }
    return false
  }),
  reset() {
    this.isSending = false
    this.email = ''
    this.password = ''
  }
})

const postSignIn = () => {
  if (!signIn.checkContent) return

  signIn.isSending = true

  apiUser
    .signIn({
      email: signIn.email.toLowerCase(),
      password: signIn.password
    })
    .then((res) => {
      localStorage.setItem('metaWall', res.headers.authorization)
      user.name = res.data.data.name
      user.avatar = res.data.data.avatar || ''
      user.gender = res.data.data.gender
      signIn.reset()
      router.replace({ name: 'home' })
    })
    .catch((error) => {
      signIn.reset()
      signIn.loginResult = error.response.data.message.toString()
      window.setTimeout(() => {
        signIn.loginResult = ''
      }, 2000)
    })
}
</script>

<template>
  <p class="w-full text-center font-sans text-2xl font-bold">
    到元宇宙展開全新社交圈
  </p>
  <div class="grid w-full px-9 pt-9 font-azeret" @keyup.enter.stop="postSignIn">
    <input
      v-model="signIn.email"
      class="custom-border w-full focus:border-primary dark:text-black"
      type="email"
      placeholder="Email"
      @input="signIn.email = signIn.email.toLowerCase()" />
    <input
      v-model="signIn.password"
      class="custom-border mt-4 w-full focus:border-primary dark:text-black"
      type="password"
      placeholder="Password" />
    <p class="mt-4 w-full text-center text-alert">{{ signIn.checkEmail }}</p>
    <p class="w-full text-center text-alert">{{ signIn.checkPassword }}</p>
    <p class="w-full text-center text-alert">{{ signIn.loginResult }}</p>
    <button
      type="button"
      :class="{
        'primary-color cursor-pointer border-black': !signIn.isSending,
        'cursor-wait border-gray-500 bg-gray-400 text-white': signIn.isSending
      }"
      class="custom-border mt-8 flex w-full items-center justify-center rounded-lg py-3 shadow-sm shadow-black"
      :disabled="!signIn.checkContent || signIn.isSending"
      @click="postSignIn">
      <span>{{ signIn.isSending ? '登入中...' : '登入' }}</span>
      <IconLoad v-show="signIn.isSending" class="ml-1 animate-spin"></IconLoad>
    </button>
    <Router-link to="/signUp" class="mx-auto mt-2 inline-block p-1"
      >註冊帳號</Router-link
    >
  </div>
</template>
