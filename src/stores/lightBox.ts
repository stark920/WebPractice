import { defineStore } from 'pinia';

export const useLightBoxStore = defineStore({
  id: 'lightBox',
  state: () => ({
    show: false,
    images: [''],
  }),
  getters: {},
  actions: {
    close() {
      this.show = false;
      this.images = [''];
    },
  },
});
