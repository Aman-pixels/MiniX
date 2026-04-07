// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWroM5TILYdsFImTfOoG_GS0F8a8bobQM",
  authDomain: "minix-e7f33.firebaseapp.com",
  projectId: "minix-e7f33",
  storageBucket: "minix-e7f33.firebasestorage.app",
  messagingSenderId: "529522105840",
  appId: "1:529522105840:web:6e9a37227aa591374c1135",
  measurementId: "G-P8RK1RK50Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
