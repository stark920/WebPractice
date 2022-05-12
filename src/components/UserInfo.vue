<script setup lang="ts">
import AvatarIcon from './AvatarIcon.vue';

interface Props {
  size?: number;
  avatar?: string;
  title?: string;
  subtitle?: string;
  id?: string;
}

function toLink(id: string | undefined) {
  if (id) return `/profile/${id}`;
  return;
}

withDefaults(defineProps<Props>(), {
  title: 'Unknown',
});
</script>

<template>
  <div class="flex items-center">
    <router-link :to="toLink(id) || ''">
      <AvatarIcon :size="size" :avatar-url="avatar"></AvatarIcon>
    </router-link>

    <div class="ml-4">
      <router-link :to="toLink(id) || ''">
        <div class="font-sans font-bold">
          {{ title }}
        </div>
      </router-link>
      <div class="font-baloo text-xs text-gray-400">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>
