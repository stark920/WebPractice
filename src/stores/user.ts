import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userData: { name: '' },
  }),
  getters: {},
  actions: {
    clear() {
      this.userData = { name: '' };
    },
  },
});
