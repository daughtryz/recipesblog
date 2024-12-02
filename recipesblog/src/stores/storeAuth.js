import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/js/firebase";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: {},
  }),
  actions: {
    registerUser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          console.log("Error.message: ", error.message);
        });
    },
    loginUser() {},
  },
});
