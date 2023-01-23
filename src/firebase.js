// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIf9NjXDxSmQXOUbW4VI6WOO1KiC9dh1M",
  authDomain: "database-c977a.firebaseapp.com",
  databaseURL: "https://database-c977a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "database-c977a",
  storageBucket: "database-c977a.appspot.com",
  messagingSenderId: "854830738384",
  appId: "1:854830738384:web:53e431f7debdaec28be7d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export default app;