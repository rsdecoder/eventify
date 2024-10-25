// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const env= process.env;
const firebaseKey = env.REACT_APP_FIREBASE_KEY;
const firebaseAuthDomain = env.REACT_APP_FIRESBASE_AUTH_DOMAIN;
const firebaseProjectId = env.REACT_APP_PROJECT_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: firebaseKey,
    authDomain: firebaseAuthDomain,
    databaseURL:
    "https://eventify-206c8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: firebaseProjectId,
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
