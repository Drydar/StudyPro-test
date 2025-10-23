// auth.js
import { auth, googleProvider, appleProvider } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// ---------- SIGN UP (Email + Password) ----------
document.getElementById("signupBtn").addEventListener("click", async () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup successful!");
    console.log("User:", userCredential.user);

    // ✅ Redirect to dashboard after successful signup
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
    console.error("Signup error:", error);
  }
});

// ---------- LOGIN (Email + Password) ----------
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    console.log("User:", userCredential.user);

    // ✅ Redirect to dashboard after successful login
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
    console.error("Login error:", error);
  }
});

// ---------- GOOGLE SIGN IN ----------
document.getElementById("googleSignupBtn").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    alert("Google signup/login successful!");
    console.log(result.user);

    // ✅ Redirect to dashboard
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
    console.error("Google auth error:", error);
  }
});

document.getElementById("googleLoginBtn").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    alert("Google login successful!");
    console.log(result.user);

    // ✅ Redirect to dashboard
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
    console.error("Google auth error:", error);
  }
});

// ---------- APPLE SIGN IN ----------
document.getElementById("appleSignupBtn").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    alert("Apple signup/login successful!");
    console.log(result.user);

    // ✅ Redirect to dashboard
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
    console.error("Apple auth error:", error);
  }
});

document.getElementById("appleLoginBtn").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    alert("Apple login successful!");
    console.log(result.user);

    // ✅ Redirect to dashboard
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
    console.error("Apple auth error:", error);
  }
});

// ---------- LOGOUT FUNCTION (Optional) ----------
export const logoutUser = async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
    window.location.href = "index.html"; // Redirect back to login page
  } catch (error) {
    alert("Logout failed: " + error.message);
    console.error("Logout error:", error);
  }
};
