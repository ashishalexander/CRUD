// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-curd-app-4bd29.firebaseapp.com",
  projectId: "mern-curd-app-4bd29",
  storageBucket: "mern-curd-app-4bd29.appspot.com",
  messagingSenderId: "906843122504",
  appId: "1:906843122504:web:33c15dd81867d81cad217d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
