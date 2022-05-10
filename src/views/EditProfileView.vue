<script setup lang="ts">
import TitleCard from '../components/TitleCard.vue';
import { ref, reactive } from 'vue';
import AvatarIcon from '../components/AvatarIcon.vue';
const currentCard = ref('name');
const validateMessage = ref(['']);
const passwordObj = reactive({
  input1: '',
  input2: '',
  compareInputs() {
    if (passwordObj.input1 !== passwordObj.input2) return ['密碼前後不一致'];
    return false;
  },
});
const pwdIsValid = ref(false);

function toggleDisplayCard(card: string) {
  if (currentCard.value === card) return;
  card === 'name'
    ? (currentCard.value = 'name')
    : (currentCard.value = 'password');
  validateMessage.value = [''];
  passwordObj.input1 = '';
  passwordObj.input2 = '';
}

function validateInputs() {
  validateMessage.value = [
    '1.圖片寬高比必需為 1:1，請重新輸入',
    '2. 解析度寬度至少 300像素以上，請重新輸入',
  ];
  setTimeout(() => (validateMessage.value = ['']), 2000);
}

function validatePassword() {
  if (passwordObj.compareInputs()) {
    validateMessage.value = ['密碼前後不一致'];
    pwdIsValid.value = false;
  } else {
    validateMessage.value = [''];
    pwdIsValid.value = true;
  }
}
</script>

<template>
  <TitleCard title="修改個人資料" />
  <div class="mt-8 flex px-4">
    <div>
      <input
        class="peer hidden"
        type="radio"
        value="name"
        name="profile"
        id="name"
        checked
        @click="toggleDisplayCard('name')"
      />
      <label
        for="name"
        class="box-border block rounded-t-lg bg-white px-4 py-2 text-black peer-checked:bg-black peer-checked:text-white dark:bg-gray-800 dark:text-white dark:peer-checked:bg-gray-600"
        >暱稱修改</label
      >
    </div>
    <div>
      <input
        class="peer hidden"
        type="radio"
        value="password"
        name="profile"
        id="password"
        @click="toggleDisplayCard('password')"
      />
      <label
        for="password"
        class="block rounded-t-lg bg-white px-4 py-2 text-black peer-checked:bg-black peer-checked:text-white dark:bg-gray-800 dark:text-white dark:peer-checked:bg-gray-600"
        >重設密碼</label
      >
    </div>
  </div>
  <div
    v-if="currentCard === 'name'"
    class="shadow-black-3px custom-border dark:dark-card flex flex-col items-center rounded-lg bg-white p-8"
  >
    <AvatarIcon :size="107"></AvatarIcon>
    <div class="mt-5">
      <input type="file" id="uploadAvatar" class="hidden" />
      <label
        for="uploadAvatar"
        class="inline-block cursor-pointer bg-black py-1 px-6 text-white"
        >上傳大頭照
      </label>
    </div>
    <div class="mt-5 w-full max-w-[300px]">
      <label for="name_input" class="block">暱稱</label>
      <input
        id="name_input"
        type="text"
        class="custom-border w-full focus:border-primary dark:text-black"
        placeholder="輸入暱稱"
      />
    </div>
    <div class="mt-5 w-full max-w-[300px]">
      <div>性別</div>
      <div class="flex items-center">
        <div class="flex items-center">
          <input type="radio" name="gender" id="male" value="1" checked />
          <label for="male" class="ml-1">男性</label>
        </div>
        <div class="ml-4 flex items-center">
          <input type="radio" name="gender" id="female" value="0" />
          <label for="female" class="ml-1">女性</label>
        </div>
        <div class="ml-4 flex items-center">
          <input type="radio" name="gender" id="others" value="2" />
          <label for="others" class="ml-1">其他</label>
        </div>
      </div>
    </div>
    <div v-if="validateMessage" class="my-8 text-alert">
      <div v-for="(msg, index) of validateMessage" :key="index">{{ msg }}</div>
    </div>
    <button
      @click="validateInputs"
      type="button"
      class="primary-color custom-border w-full max-w-[300px] rounded-lg py-3"
    >
      送出更新
    </button>
  </div>
  <div
    v-else
    class="shadow-black-3px custom-border dark:dark-card flex flex-col items-center rounded-lg bg-white p-8"
  >
    <div class="w-full max-w-[300px]">
      <label for="pwd" class="block">輸入新密碼</label>
      <input
        @blur="validatePassword"
        id="pwd"
        type="password"
        class="custom-border w-full focus:border-primary dark:text-black"
        placeholder="請輸入新密碼"
        v-model="passwordObj.input1"
      />
    </div>
    <div class="mt-5 w-full max-w-[300px]">
      <label for="pwd_double" class="block">再次輸入</label>
      <input
        @blur="validatePassword"
        id="pwd_double"
        type="password"
        class="custom-border w-full focus:border-primary dark:text-black"
        placeholder="再次輸入新密碼"
        v-model="passwordObj.input2"
      />
    </div>
    <div v-if="validateMessage" class="my-8 text-alert">
      <div v-for="(msg, index) of validateMessage" :key="index">{{ msg }}</div>
    </div>
    <button
      type="button"
      :class="{
        'primary-color border-black': pwdIsValid,
        'border-gray-500 bg-gray-400 ': !pwdIsValid,
      }"
      class="w-full max-w-[300px] rounded-lg border-2 py-3 text-white"
    >
      重設密碼
    </button>
  </div>
</template>
