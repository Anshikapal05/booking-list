import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: process.env.REACT_APIKEY,
  authDomain: process.env.REACT_AUTHDOMAIN,
  projectId: process.env.REACT_PROJECTID,
  storageBucket: process.env.REACT_STORBUCKET,
  messagingSenderId: process.env.REACT_MSGSENDID,
  appId: process.env.REACT_APPID,
  measurementId: process.env.REACT_MEASUREID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
