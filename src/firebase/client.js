// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2WFgWU1z_84p5hoz2IZGmcyamj-oA5ig",
  authDomain: "bz-print-9007b.firebaseapp.com",
  projectId: "bz-print-9007b",
  storageBucket: "bz-print-9007b.firebasestorage.app",
  messagingSenderId: "552171785048",
  appId: "1:552171785048:web:8ec58192af7cfbaaff332d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)