import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInAnonymously, 
  signInWithCustomToken, 
  signOut 
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// --- FIREBASE INITIALIZATION ---
// Consolidating initialization here ensures the context has immediate access 
// to services without resolution errors in the preview environment.
const firebaseConfig = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config) 
  : {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'aura-fitness-pro';

const AuthContext = createContext();

/**
 * useAuth Hook
 * Custom hook to consume the AuthContext easily.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

/**
 * AuthProvider Component
 * Manages the global authentication state, user profile sync, and session logic.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initialize Authentication (Custom Token or Anonymous)
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        // Silent fail for initialization
      }
    };
    initAuth();

    // 2. Listen for Auth State Changes
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const userRef = doc(db, 'artifacts', appId, 'users', u.uid);
        const snap = await getDoc(userRef);
        
        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          // Initialize default profile for first-time users
          const defaultProfile = {
            uid: u.uid,
            name: "New Athlete",
            role: 'MEMBER',
            weight: 75,
            height: 180,
            subscription: {
              active: true,
              plan: 'yearly',
              expiry: Date.now() + (365 * 24 * 60 * 60 * 1000),
              started: Date.now()
            },
            createdAt: Date.now()
          };
          await setDoc(userRef, defaultProfile);
          setUserData(defaultProfile);
        }
        setUser(u);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userData,
    loading,
    logout: () => signOut(auth),
    isTrainer: userData?.role === 'TRAINER',
    isMember: userData?.role === 'MEMBER',
    db,
    auth,
    appId
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};