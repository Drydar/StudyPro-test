// auth.js
// Make sure Bootstrap JS & CSS are linked in auth.html

import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  doc,
  setDoc
} from "./firebase.js";

// 🔔 Toast (animated alert) function
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toastContainer");
  const bg = type === "error" ? "bg-danger" : "bg-success";
  const toast = document.createElement("div");

  toast.className = `toast align-items-center text-white border-0 ${bg}`;
  toast.role = "alert";
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  toastContainer.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();
  setTimeout(() => toast.remove(), 4000);
}

// 🔹 Signup
const signupBtn = document.getElementById("signupBtn");
signupBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  const fullname = document.getElementById("signupFullname").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!fullname || !email || !password) {
    return showToast("Please fill all fields", "error");
  }

  try {
    signupBtn.disabled = true;
    signupBtn.textContent = "Signing up...";

    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCred.user.uid), {
      fullname,
      email,
      joinedAt: new Date().toISOString()
    });

    showToast("Signup successful 🎉");
    setTimeout(() => (window.location.href = "index.html"), 1500);
  } catch (err) {
    console.error(err);
    showToast(err.message, "error");
  } finally {
    signupBtn.disabled = false;
    signupBtn.textContent = "Sign Up";
  }
});

// 🔹 Login
const loginBtn = document.getElementById("loginBtn");
loginBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) return showToast("Enter both fields", "error");

  try {
    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";
    await signInWithEmailAndPassword(auth, email, password);
    showToast("Login successful 🎉");
    setTimeout(() => (window.location.href = "index.html"), 1000);
  } catch (err) {
    console.error(err);
    showToast(err.message, "error");
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Login";
  }
});

// 🔹 Google Auth
const googleLogin = document.getElementById("googleLogin");
googleLogin?.addEventListener("click", async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      fullname: user.displayName || "Google User",
      email: user.email,
      joinedAt: new Date().toISOString()
    }, { merge: true });

    showToast("Google login successful 🎉");
    setTimeout(() => (window.location.href = "index.html"), 1000);
  } catch (err) {
    console.error(err);
    showToast(err.message, "error");
  }
});

// 🔹 Apple Auth
const appleLogin = document.getElementById("appleLogin");
appleLogin?.addEventListener("click", async () => {
  try {
    const provider = new OAuthProvider("apple.com");
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      fullname: user.displayName || "Apple User",
      email: user.email,
      joinedAt: new Date().toISOString()
    }, { merge: true });

    showToast("Apple login successful 🎉");
    setTimeout(() => (window.location.href = "index.html"), 1000);
  } catch (err) {
    console.error(err);
    showToast(err.message, "error");
  }
});

// 🔹 Forgot password
const forgotPassword = document.getElementById("forgotPassword");
forgotPassword?.addEventListener("click", async () => {
  const email = prompt("Enter your registered email:");
  if (!email) return;
  try {
    await sendPasswordResetEmail(auth, email);
    showToast("Password reset email sent — check your inbox");
  } catch (err) {
    console.error(err);
    showToast(err.message, "error");
  }
});

// 🔹 Logout
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    showToast("Logged out successfully 👋");
    setTimeout(() => (window.location.href = "auth.html"), 1000);
  } catch (err) {
    console.error(err);
    showToast("Logout failed", "error");
  }
});

// 🔹 Auth state listener
onAuthStateChanged(auth, (user) => {
  console.log("User:", user?.email || "Not logged in");
});