// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCdYTjMxs1gSuUEanNfoEE6HiqRqOht3CU",
  authDomain: "yarafoods-2bcc0.firebaseapp.com",
  projectId: "yarafoods-2bcc0",
  storageBucket: "yarafoods-2bcc0.appspot.com",
  databaseURL: "https://yarafoods-2bcc0-default-rtdb.firebaseio.com",
  messagingSenderId: "967511739880",
  appId: "1:967511739880:web:5e0036fdd90de609cfa85d",
  measurementId: "G-YK311R2TZE"
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
