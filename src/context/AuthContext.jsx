import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  const ADMIN_EMAIL = 'sonagra123pratik@gmail.com';

  const checkAndSetRole = async (user) => {
    if (user.email === ADMIN_EMAIL) {
      setRole('admin');
      return 'admin';
    } else {
      setRole('user');
      return 'user';
    }
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userRole = await checkAndSetRole(userCredential.user);
    return { ...userCredential.user, role: userRole };
  };

  const signup = async (email, password, companyName, gstin) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save additional user info to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      companyName: companyName,
      gstin: gstin,
      role: 'user', // newly signed up users are standard users
      createdAt: new Date()
    });
    
    await checkAndSetRole(user);
    return { ...user, role: 'user' };
  };
  
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Check if user document exists, if not create it
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists() && user.email !== ADMIN_EMAIL) {
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        role: 'user',
        createdAt: new Date()
      });
    }

    const userRole = await checkAndSetRole(user);
    return { ...user, role: userRole };
  };

  const logout = async () => {
    await signOut(auth);
    setRole(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await checkAndSetRole(user);
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    role,
    login,
    signup,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
