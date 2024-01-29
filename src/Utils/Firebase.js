// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7YamsP9a64_cuiGiKu1Bbl5IxscDqp1o",
  authDomain: "netflix-gpt-80d84.firebaseapp.com",
  projectId: "netflix-gpt-80d84",
  storageBucket: "netflix-gpt-80d84.appspot.com",
  messagingSenderId: "1022383735645",
  appId: "1:1022383735645:web:c33657f135ed48e4209eb4",
  measurementId: "G-4DPK4ZVPTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const auth = getAuth();