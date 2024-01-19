// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDasjcXIuqBLzGLWndQubdDhNYAZdJrU8",
  authDomain: "cupseller-9d7e6.firebaseapp.com",
  projectId: "cupseller-9d7e6",
  storageBucket: "cupseller-9d7e6.appspot.com",
  messagingSenderId: "770932102306",
  appId: "1:770932102306:web:3e0223ac0796f49faff3fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
export const storage = getStorage(app);