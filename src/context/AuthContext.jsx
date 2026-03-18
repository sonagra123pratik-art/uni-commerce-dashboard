import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // This AuthContext is a lightweight stub that removes Firebase Auth dependency.
  // It determines admin vs user by hostname: requests to `app.<your-domain>` are treated
  // as admin clients. The rest of the app keeps the same `useAuth()` API.

  const ADMIN_EMAIL = 'sonagra123pratik@gmail.com';

  const getRoleFromHost = () => {
    try {
      const host = typeof window !== 'undefined' ? window.location.hostname : '';
      if (host && host.startsWith('app.')) return 'admin';
    } catch (e) {}
    return 'user';
  };

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(getRoleFromHost());

  useEffect(() => {
    // On mount, set a default currentUser for admin host so admin dashboard works without login.
    if (role === 'admin') {
      setCurrentUser({ email: ADMIN_EMAIL, displayName: 'Administrator' });
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
  }, [role]);

  // Public API kept similar to original, but now implemented locally without Firebase.
  const login = async (email) => {
    const user = { email, displayName: email.split('@')[0] };
    setCurrentUser(user);
    setRole(email === ADMIN_EMAIL ? 'admin' : 'user');
    return { ...user, role: email === ADMIN_EMAIL ? 'admin' : 'user' };
  };

  const signup = async (email, password, companyName, gstin) => {
    const user = { email, displayName: email.split('@')[0], companyName, gstin };
    setCurrentUser(user);
    setRole('user');
    return { ...user, role: 'user' };
  };

  const loginWithGoogle = async () => {
    const user = { email: ADMIN_EMAIL, displayName: 'Administrator' };
    setCurrentUser(user);
    setRole('admin');
    return { ...user, role: 'admin' };
  };

  const logout = async () => {
    setCurrentUser(null);
    setRole(getRoleFromHost());
  };

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
