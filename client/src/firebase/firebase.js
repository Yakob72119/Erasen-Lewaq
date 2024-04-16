// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxEI2FGGJfBASV_FpvFLFwUmwH-ExzSi8",
  authDomain: "erasen-lewaq.firebaseapp.com",
  projectId: "erasen-lewaq",
  storageBucket: "erasen-lewaq.appspot.com",
  messagingSenderId: "996424741222",
  appId: "1:996424741222:web:d1d5906a0695b3afec58a7",
  measurementId: "G-XV2HD5F2PX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
// const analytics = getAnalytics(app);

export {
  app,
  auth
};

