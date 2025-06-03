import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAA69i_ONQqQ8lTOSljpHFmVCNiXdkaHjQ",
  authDomain: "dmeo-auth.firebaseapp.com",
  projectId: "dmeo-auth",
  storageBucket: "dmeo-auth.firebasestorage.app",
  messagingSenderId: "782605981346",
  appId: "1:782605981346:web:b1a888b9cfb364574fe9fb",
};

const appFire = initializeApp(firebaseConfig);
const auth = getAuth(appFire);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
