import {
  auth,
  db,
  doc,
  setDoc,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "./firebase.js";

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const toLogin = document.getElementById("toLogin");
const toSignup = document.getElementById("toSignup");
const forgotPassword = document.getElementById("forgotPassword");
const toastContainer = document.getElementById("toastContainer");

// 🔔 Toast Message
function showToast(message, type = "success") {
  const bg = type === "error" ? "bg-danger" : "bg-success";
  const toastEl = document.createElement("div");
  toastEl.className = `toast align-items-center text-white border-0 ${bg}`;
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>`;
  toastContainer.appendChild(toastEl);
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
  setTimeout(() => toastEl.remove(), 4000);
}

// 🔄 Toggle Between Login and Signup
toLogin.addEventListener("click", () => {
  signupForm.classList.remove("show");
  signupForm.classList.add("hide");
  setTimeout(() => {
    loginForm.classList.remove("hide");
    loginForm.classList.add("show");
  }, 300);
});

toSignup.addEventListener("click", () => {
  loginForm.classList.remove("show");
  loginForm.classList.add("hide");
  setTimeout(() => {
    signupForm.classList.remove("hide");
    signupForm.classList.add("show");
  }, 300);
});

// 📝 SIGN UP
document.getElementById("signupBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const fullname = document.getElementById("signupFullname").value.trim();
  const school = document.getElementById("signupSchool").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!fullname || !school || !email || !password)
    return showToast("Please fill all fields", "error");

  try {
    const btn = e.target;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Signing up...`;
    btn.disabled = true;

    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    await setDoc(doc(db, "users", user.uid), {
      fullname,
      email,
      school,
      department: "",
      level: "",
    });
    showToast("Signup successful 🎉");
    setTimeout(() => (window.location.href = "index.html"), 1500);
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    e.target.innerHTML = "Sign Up";
    e.target.disabled = false;
  }
});

// 🔐 LOGIN
document.getElementById("loginBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) return showToast("Enter all fields", "error");

  try {
    const btn = e.target;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Logging in...`;
    btn.disabled = true;

    await signInWithEmailAndPassword(auth, email, password);
    showToast("Login successful 🎉");
    setTimeout(() => (window.location.href = "index.html"), 1500);
  } catch (error) {
    showToast(error.message, "error");
  } finally {
    e.target.innerHTML = "Login";
    e.target.disabled = false;
  }
});

// 🔑 Forgot Password
forgotPassword.addEventListener("click", async () => {
  const email = prompt("Enter your registered email:");
  if (!email) return;
  try {
    await sendPasswordResetEmail(auth, email);
    showToast("Password reset link sent! Check your email.");
  } catch (error) {
    showToast(error.message, "error");
  }
});

// 🌐 Google Sign Up/Login
async function handleGoogleAuth() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await setDoc(
      doc(db, "users", user.uid),
      {
        fullname: user.displayName || "Google User",
        email: user.email,
        school: "Not set",
        department: "",
        level: "",
      },
      { merge: true }
    );
    showToast("Login successful 🎉");
    setTimeout(() => (window.location.href = "index.html"), 1500);
  } catch (error) {
    showToast(error.message, "error");
  }
}
document.getElementById("googleLogin").addEventListener("click", handleGoogleAuth);
document.getElementById("googleSignup").addEventListener("click", handleGoogleAuth);

// 🍎 Apple Sign Up/Login
async function handleAppleAuth() {
  try {
    const provider = new OAuthProvider("apple.com");
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await setDoc(
      doc(db, "users", user.uid),
      {
        fullname: user.displayName || "Apple User",
        email: user.email,
        school: "Not set",
        department: "",
        level: "",
      },
      { merge: true }
    );
    showToast("Login successful 🎉");
    setTimeout(() => (window.location.href = "index.html"), 1500);
  } catch (error) {
    showToast(error.message, "error");
  }
}
document.getElementById("appleLogin").addEventListener("click", handleAppleAuth);
document.getElementById("appleSignup").addEventListener("click", handleAppleAuth);

// 🚀 AUTO REDIRECT IF ALREADY LOGGED IN
onAuthStateChanged(auth, (user) => {
  if (user) {
    // If user is logged in already, go straight to dashboard
    window.location.href = "index.html";
  }
});