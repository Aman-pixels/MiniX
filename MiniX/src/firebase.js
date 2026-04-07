import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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

// Initialize Firebase Auth
export const auth = getAuth(app);
export default app;
