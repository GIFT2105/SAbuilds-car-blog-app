import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAuth, GoogleAuthProvider, } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDe9fV4tN78aodreWzE5-8L1qtVfYZ6e3Y",
  authDomain: "blohg-e1870.firebaseapp.com",
  projectId: "blohg-e1870",
  storageBucket: "blohg-e1870.appspot.com",
  messagingSenderId: "1040007640152",
  appId: "1:1040007640152:web:f059cfdaa413003021462d",
  measurementId: "G-7P96MT7XME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);



