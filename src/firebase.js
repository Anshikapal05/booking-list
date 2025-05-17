import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyDBtWn7MfIMVCIvzYo4Ys_-mnDtpG0buHo",
  authDomain: "login-auth-40f67.firebaseapp.com",
  projectId: "login-auth-40f67",
  storageBucket: "login-auth-40f67.firebasestorage.app",
  messagingSenderId: "62909189535",
  appId: "1:62909189535:web:1804b64bffdb7bba8581aa",
  measurementId: "G-DQEGX7WD4K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
