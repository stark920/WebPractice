<script setup lang="ts">
import AvatarIcon from './AvatarIcon.vue';

interface Props {
  size?: number;
  avatarUrl?: string;
  title?: string;
  subtitle?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Unknown',
});
</script>

<template>
  <div class="flex items-center">
    <AvatarIcon :size="size" :avatar-url="avatarUrl"></AvatarIcon>
    <div class="ml-4">
      <div class="font-sans font-bold">
        {{ title }}
      </div>
      <div class="font-baloo text-xs text-gray-400">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>
