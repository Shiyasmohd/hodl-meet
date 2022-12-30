// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRe57R5L3BZ2K6P12D1PeRFqRg0W3X570",
  authDomain: "hodl-meet.firebaseapp.com",
  projectId: "hodl-meet",
  storageBucket: "hodl-meet.appspot.com",
  messagingSenderId: "719450787221",
  appId: "1:719450787221:web:697dd436e9c0eaa53a3a9c",
  measurementId: "G-74CYV84MBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);