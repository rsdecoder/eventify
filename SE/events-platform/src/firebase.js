// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Key } from "./apiKey";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: Key,
    authDomain: "eventify-206c8.firebaseapp.com",
    databaseURL:
    "https://eventify-206c8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "eventify-206c8",
    storageBucket: "eventify-206c8.appspot.com",
    messagingSenderId: "108998225094",
    appId: "1:108998225094:web:2624effa38aa81455d7bc7"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Initialise Auth
export const auth = getAuth(app);

// //database fetch
export const db = getFirestore();
