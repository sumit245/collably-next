import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAzTdXEp_VqvfmCbUrINKl-R_BXX-Ufk-E",
    authDomain: "authbyotp-99212.firebaseapp.com",
    projectId: "authbyotp-99212",
    storageBucket: "authbyotp-99212.firebaseapp.com",
    messagingSenderId: "267382277495",
    appId: "1:267382277495:web:23d06c38ea00722b4fcd72",
    measurementId: "G-T9LTBM6ZE0",
  }

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };
