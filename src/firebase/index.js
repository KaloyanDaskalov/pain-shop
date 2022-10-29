import { initializeApp } from "firebase/app"
// import "firebase/auth"
import { getFirestore } from '@firebase/firestore'
import { getAuth } from '@firebase/auth'

const app = initializeApp({
    apiKey: "AIzaSyAyjWdlAy7V37KyApYSgRy8ORdZzkeP2Qg",
    authDomain: "paint-shop-7884e.firebaseapp.com",
    projectId: "paint-shop-7884e",
    storageBucket: "paint-shop-7884e.appspot.com",
    messagingSenderId: "665536672688",
    appId: "1:665536672688:web:66e45425f52d2ef92f1c75"
})

export const auth = getAuth(app)
export const firestore = getFirestore(app)
export default app

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyjWdlAy7V37KyApYSgRy8ORdZzkeP2Qg",
  authDomain: "paint-shop-7884e.firebaseapp.com",
  projectId: "paint-shop-7884e",
  storageBucket: "paint-shop-7884e.appspot.com",
  messagingSenderId: "665536672688",
  appId: "1:665536672688:web:66e45425f52d2ef92f1c75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/