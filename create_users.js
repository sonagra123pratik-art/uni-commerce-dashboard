import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

import { signInWithEmailAndPassword } from 'firebase/auth';

const createAccount = async (email, password, role, companyName) => {
  try {
    let user;
    try {
      // Try creating
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user = userCredential.user;
      console.log(`Created new Auth for ${email}`);
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        user = userCredential.user;
        console.log(`Logged into existing Auth for ${email}`);
      } else {
        throw e;
      }
    }
    
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: companyName,
      role: role,
      createdAt: new Date()
    });
    console.log(`Successfully wrote to Database for ${role} account: ${email}`);
  } catch (error) {
    console.error(`Error processing ${email}:`, error.message);
  }
};

async function run() {
  await createAccount('sonagra123pratik@gmail.com', 'Pratik123@', 'admin', 'Pratik Sonagra (Admin)');
  process.exit();
}

run();
