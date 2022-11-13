import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyBFD-1TkE9MDVhaQFm6_7CxbirSBWHsiKs",
  authDomain: "messe-af795.firebaseapp.com",
  projectId: "messe-af795",
  storageBucket: "messe-af795.appspot.com",
  messagingSenderId: "1067492532107",
  appId: "1:1067492532107:web:7b7c516a0e726e8246198e",
};

const fireBaseApp = firebase.initializeApp(config);
export const db = fireBaseApp.firestore();
