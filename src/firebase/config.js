// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxnv5pdEpMmHrYvJnhnvjTApOHhNb-cT0",
  authDomain: "wealthpulse-5d98e.firebaseapp.com",
  projectId: "wealthpulse-5d98e",
  storageBucket: "wealthpulse-5d98e.firebasestorage.app",
  messagingSenderId: "175204425998",
  appId: "1:175204425998:web:8338eb1de7df0a1a6ab75f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);