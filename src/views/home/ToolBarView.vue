<script setup lang="ts">
import ButtonIcon from '../../components/ButtonIcon.vue';
import IconBell from '../../components/icons/IconBell.vue';
import IconThumbUp from '../../components/icons/IconThumbUp.vue';
import IconHome from '../../components/icons/IconHome.vue';
import IconPlus from '../../components/icons/IconPlus.vue';
</script>

<template>
  <div
    class="custom-border fixed bottom-1 left-2 right-2 flex justify-evenly rounded-full bg-bg-light py-2 dark:border-gray-500 dark:bg-gray-800"
  >
    <router-link to="/">
      <ButtonIcon
        class="bg-white hover:bg-primary hover:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
      >
        <IconHome class="h-6 w-6" />
      </ButtonIcon>
    </router-link>

    <router-link to="/">
      <ButtonIcon
        class="bg-white hover:bg-primary hover:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
      >
        <IconThumbUp class="h-6 w-6" />
      </ButtonIcon>
    </router-link>

    <router-link to="/">
      <ButtonIcon
        class="bg-white hover:bg-primary hover:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
      >
        <IconBell class="h-6 w-6" />
      </ButtonIcon>
    </router-link>

    <router-link to="/">
      <ButtonIcon
        class="bg-primary text-white hover:bg-warn hover:text-white dark:bg-gray-300 dark:text-gray-700 dark:hover:bg-gray-100"
      >
        <IconPlus class="h-6 w-6" />
      </ButtonIcon>
    </router-link>
  </div>
</template>
