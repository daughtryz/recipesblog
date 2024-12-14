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
    invalidCredentials: "",
  }),
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push("/");
        } else {
          // User is signed out
          this.user = {};
          this.router.push({ name: "loginPage" });
        }
      });
    },
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
    loginUser(credentials) {
      console.log("In the store login");
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          console.log("Successfully signed in");
          this.invalidCredentials = "";
        })
        .catch((error) => {
          if (error.message.includes("auth/invalid-credential")) {
            this.invalidCredentials = "Invalid username/password";
          }
        });
    },
    logout() {
      signOut(auth)
        .then(() => {})
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
});
