import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCNJ6Y-ZS-1sFAnS_Nt5YGgFDnPOwoqgk",
  authDomain: "sneaker-e981a.firebaseapp.com",
  projectId: "sneaker-e981a",
  storageBucket: "sneaker-e981a.appspot.com",
  messagingSenderId: "766526812071",
  appId: "1:766526812071:web:7456f7176f36d110909082",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const db = app.firestore();
export const logout1 = () => {
  auth.signOut();
};
