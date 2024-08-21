// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBCPkEenIU7tC9zDm-q58CXFroisGT2Z20",
  authDomain: "yarafoods-edd51.firebaseapp.com",
  databaseURL: "https://yarafoods-edd51-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yarafoods-edd51",
  storageBucket: "yarafoods-edd51.appspot.com",
  messagingSenderId: "106429389219",
  appId: "1:106429389219:web:034fd6f9f56570d475e216",
  measurementId: "G-4ECN7LG244",
  databaseURL: "https://yarafoods-edd51-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const firebase_Auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const Real_time_database = getDatabase(app);
