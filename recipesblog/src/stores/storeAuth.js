import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: {},
  }),
  actions: {
    registerUser(credentials) {
        this.user = {
            emai: credentials.email,
            password: credentials.password
        }
    },
    loginUser() {

    }
  },
});
