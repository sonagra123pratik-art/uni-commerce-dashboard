import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBkYm5_PJZTRGxdX9_l5WwAVmZW24Yr_IU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fluxehub-da40f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fluxehub-da40f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fluxehub-da40f.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "823308042011",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:823308042011:web:1e535c0a316c64df0f1dbe",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DGER5HKJ6Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  analytics = null;
}

export { app, auth, db, analytics };
