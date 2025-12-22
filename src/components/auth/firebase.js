// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6zGQT9BJs3AP2Ftr3Q6S-uR7SqRAoiXY",
  authDomain: "pickle-test-3e7e4.firebaseapp.com",
  projectId: "pickle-test-3e7e4",
  storageBucket: "pickle-test-3e7e4.firebasestorage.app",
  messagingSenderId: "386941487196",
  appId: "1:386941487196:web:0507421b9cd50d6debbe99",
  measurementId: "G-750YE6QCSR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 2. auth 변수를 내보내기 (export)
export default app;
