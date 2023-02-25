// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "@firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBK6NnrFvdntrhIA-Nkh1CmU8PxqIvwob8",
    authDomain: "bespokedbikes-e3663.firebaseapp.com",
    projectId: "bespokedbikes-e3663",
    storageBucket: "bespokedbikes-e3663.appspot.com",
    messagingSenderId: "575024001323",
    appId: "1:575024001323:web:08bc5aa2e42ae62726d56e",
    measurementId: "G-8YTGT53Q33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore();