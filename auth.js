import { auth, googleProvider, appleProvider } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut 
} from "firebase/auth";

// ------------------ EMAIL + PASSWORD ------------------
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    alert(error.message);
    console.error("Signup error:", error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    alert(error.message);
    console.error("Login error:", error.message);
  }
};

// ------------------ GOOGLE ------------------
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google login successful:", result.user);
    return result.user;
  } catch (error) {
    alert(error.message);
    console.error("Google login error:", error.message);
  }
};

// ------------------ APPLE ------------------
export const loginWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    console.log("Apple login successful:", result.user);
    return result.user;
  } catch (error) {
    alert(error.message);
    console.error("Apple login error:", error.message);
  }
};

// ------------------ LOGOUT ------------------
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    alert(error.message);
    console.error("Logout error:", error.message);
  }
};
