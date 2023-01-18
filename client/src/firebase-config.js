// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth' 
import {getFirestore} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3ZslRgr326mrxuWJd0A2VFK9vXwq_YNc",
  authDomain: "sustainable-fashion-website.firebaseapp.com",
  projectId: "sustainable-fashion-website",
  storageBucket: "sustainable-fashion-website.appspot.com",
  messagingSenderId: "214909694222",
  appId: "1:214909694222:web:b69f74ea7aea0b3d4d275f",
  measurementId: "G-ZL5VWP155D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();