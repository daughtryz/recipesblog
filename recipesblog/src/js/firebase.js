import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_3NlfLO-9DLruIKqy6vg2O-FVMvsuPC8",
  authDomain: "recipeblog-26541.firebaseapp.com",
  projectId: "recipeblog-26541",
  storageBucket: "recipeblog-26541.firebasestorage.app",
  messagingSenderId: "787165561724",
  appId: "1:787165561724:web:d10a89e2dad54492435af9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
