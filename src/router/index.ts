import { createRouter, createWebHashHistory } from 'vue-router';
import PostsView from '@/views/PostsView.vue';
import HomeView from '@/views/HomeView.vue';
import SignView from '@/views/SignView.vue';
import SignInVue from '@/components/SignIn.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: SignView,
      children: [
        {
          path: '',
          name: 'signIn',
          component: SignInVue,
        },
        {
          path: 'signUp',
          name: 'signUp',
          component: () => import('@/components/SignUp.vue'),
        },
      ],
    },
    {
      path: '/home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'home',
          component: PostsView,
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/EditProfileView.vue'),
        },
        {
          path: 'post',
          name: 'post',
          component: () => import('../views/AddPostView.vue'),
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'signIn' },
    },
  ],
});

export default router;
