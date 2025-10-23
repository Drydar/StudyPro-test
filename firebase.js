// Import the Firebase functions you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  OAuthProvider 
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM2Xs75Gr4s3kT2inyebPFFHJ9s7S1mQM",
  authDomain: "studypro-74ae2.firebaseapp.com",
  projectId: "studypro-74ae2",
  storageBucket: "studypro-74ae2.firebasestorage.app",
  messagingSenderId: "453552383297",
  appId: "1:453552383297:web:9e28143b4aa445682cadc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Setup Providers
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

// Export for use in other files
export { auth, googleProvider, appleProvider };
