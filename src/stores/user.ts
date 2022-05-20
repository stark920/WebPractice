import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: '',
    avatar: '',
    gender: ''
  }),
  getters: {},
  actions: {
    clear() {
      this.name = ''
      this.avatar = ''
      this.gender = ''
    }
  }
})
