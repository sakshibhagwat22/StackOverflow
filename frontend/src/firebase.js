// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwMBAyClAlLNWEbzlqnZQtz4rvXeJ_gSw",
  authDomain: "stackoverflow-clone-f879c.firebaseapp.com",
  projectId: "stackoverflow-clone-f879c",
  storageBucket: "stackoverflow-clone-f879c.appspot.com",
  messagingSenderId: "107348394259",
  appId: "1:107348394259:web:475b3b9641b1efdb2a5ae6",
  measurementId: "G-3L9GZ0HZY1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth= getAuth();
const provider=new GoogleAuthProvider();

export {auth,provider};
