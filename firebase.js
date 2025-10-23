import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBM2Xs75Gr4s3kT2inyebPFFHJ9s7S1mQM",
  authDomain: "studypro-74ae2.firebaseapp.com",
  projectId: "studypro-74ae2",
  storageBucket: "studypro-74ae2.firebasestorage.app",
  messagingSenderId: "453552383297",
  appId: "1:453552383297:web:9e28143b4aa445682cadc0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
};