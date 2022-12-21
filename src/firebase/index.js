import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "@firebase/storage";

const app = initializeApp({
  apiKey: "AIzaSyAyjWdlAy7V37KyApYSgRy8ORdZzkeP2Qg",
  authDomain: "paint-shop-7884e.firebaseapp.com",
  projectId: "paint-shop-7884e",
  storageBucket: "paint-shop-7884e.appspot.com",
  messagingSenderId: "665536672688",
  appId: "1:665536672688:web:66e45425f52d2ef92f1c75"
});

export const auth = getAuth(app);
export const bucketUrl = getStorage(app);
export const firestore = getFirestore(app);
export const gallery = collection(firestore, "gallery");
