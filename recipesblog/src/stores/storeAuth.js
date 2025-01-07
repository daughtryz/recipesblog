import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/js/firebase";
import { getCookie, setCookie } from '../utils/cookiesUtils';

const LOGIN_EXPIRATION_MINS = 30;
const COOKIE_NAME = 'userToken';

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
          this.user.photoURL = user.photoURL;
          console.log(user)
        } else {
          // User is signed out
          this.user = {};
        }
      });
    },
    async reAuthUser() {
      if (this.user)
        return false;

      const persistedUserToken = getCookie(COOKIE_NAME);
      if (!persistedUserToken)
        return false;

      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        this.user.id = user.uid;
        this.user.email = user.email;
        this.user.photoURL = user.photoURL;
        return true;
      }
      return false;
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
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          this.invalidCredentials = "";
          setCookie(COOKIE_NAME, auth.currentUser.accessToken, LOGIN_EXPIRATION_MINS);
          this.user.id = auth.currentUser.uid;
          this.user.email = auth.currentUser.email;
          this.user.photoURL = auth.currentUser.photoURL;
          this.router.push("/");
        })
        .catch((error) => {
          if (error.message.includes("auth/invalid-credential")) {
            this.invalidCredentials = "Invalid username/password";
          }
        });
    },
    logout() {
      signOut(auth)
        .then(() => {
          this.router.push({ name: "loginPage" });
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
});
