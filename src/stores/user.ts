import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    id: '',
    name: '',
    avatar: '',
  }),
  getters: {},
  actions: {
    clear() {
      this.id = '';
      this.name = '';
      this.avatar = '';
    },
  },
});
