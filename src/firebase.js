import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkYm5_PJZTRGxdX9_l5WwAVmZW24Yr_IU",
  authDomain: "fluxehub-da40f.firebaseapp.com",
  projectId: "fluxehub-da40f",
  storageBucket: "fluxehub-da40f.appspot.com",
  messagingSenderId: "823308042011",
  appId: "1:823308042011:web:1e535c0a316c64df0f1dbe",
  measurementId: "G-DGER5HKJ6Z"
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
