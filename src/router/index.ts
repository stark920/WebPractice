import { createRouter, createWebHashHistory } from 'vue-router';
import PostsView from '../views/PostsView.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '',
          component: PostsView,
        },
        {
          path: 'profile',
          component: () => import('../views/EditProfileView.vue'),
        },
        {
          path: 'post',
          component: () => import('../views/AddPostView.vue'),
        },
      ],
    },
  ],
});

export default router;
