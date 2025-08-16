import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAO681GCFHNl7hKHoJaaqz3a_0RawTbSjs",
  authDomain: "hindustan-steel-fabrication.firebaseapp.com",
  projectId: "hindustan-steel-fabrication",
  storageBucket: "hindustan-steel-fabrication.firebasestorage.app",
  messagingSenderId: "482333951709",
  appId: "1:482333951709:web:d6b494d3a2be03fbd23d34",
  measurementId: "G-022RJ4KB3R"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { serverTimestamp };
