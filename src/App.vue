<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
const router = useRouter();
const user = useUserStore();

onBeforeMount(() => {
  const token = localStorage.getItem('metaWall');
  if (!token) return;

  axios({
    method: 'post',
    url: 'https://enigmatic-reef-71098.herokuapp.com/users',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      user.id = res.data.data._id;
      user.name = res.data.data.name;
      user.avatar = res.data.data.avatar;
      router.push({ name: 'home' });
    })
    .catch(() => {
      // token expired, nothing to do
    });
});
</script>
