import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/**
 * Firebase Service Initializer
 * For local development, ensure these variables are defined in your .env file.
 * In the Canvas environment, these are injected via global constants.
 */
const firebaseConfig = {
  apiKey: "AIzaSyDVcVNhgujWn2LLAVAA4SoE794_deueLp8",
  authDomain: "aura-gym-fc714.firebaseapp.com",
  projectId: "aura-gym-fc714",
  storageBucket: "aura-gym-fc714.firebasestorage.app",
  messagingSenderId: "20744812454",
  appId: "1:20744812454:web:df8e0d1cfc91f7ca400167"
};

// Fallback for Canvas Environment if .env is not present
const config = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config) 
  : firebaseConfig;

const app = initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const appId = typeof __app_id !== 'undefined' ? __app_id : 'aura-fitness-pro';

export default app;