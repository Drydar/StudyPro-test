import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
//import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
//import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBM2Xs75Gr4s3kT2inyebPFFHJ9s7S1mQM",
  authDomain: "studypro-74ae2.firebaseapp.com",
  projectId: "studypro-74ae2",
  storageBucket: "studypro-74ae2.firebasestorage.app",
  messagingSenderId: "453552383297",
  appId: "1:453552383297:web:9e28143b4aa445682cadc0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function displayMessage(message, type = 'info') {
    let messageEl = document.getElementById('message');
    if (!messageEl) {
        // Create a message element dynamically if it doesn't exist
        messageEl = document.createElement('div');
        messageEl.id = 'message';
        // Basic styling (you can override this with your CSS)
        messageEl.style.position = 'fixed';
        messageEl.style.bottom = '20px';
        messageEl.style.left = '50%';
        messageEl.style.transform = 'translateX(-50%)';
        messageEl.style.padding = '10px 20px';
        messageEl.style.borderRadius = '9px';
        messageEl.style.fontFamily = 'Poppins';
        messageEl.style.zIndex = '1200';
        document.body.appendChild(messageEl);
    }
    // Set background and text colors based on the type of message
    if (type === 'error') {
        messageEl.style.backgroundColor = '#f8d7da';
        messageEl.style.color = '#721c24';
        messageEl.style.border = '1px solid #f5c6cb';
    } else if (type === 'success') {
        messageEl.style.backgroundColor = '#d4edda';
        messageEl.style.color = '#155724';
        messageEl.style.border = '1px solid #c3e6cb';
    } else {
        messageEl.style.backgroundColor = '#d1ecf1';
        messageEl.style.color = '#0c5460';
        messageEl.style.border = '1px solid #bee5eb';
    }
    messageEl.innerText = message;
    // Clear the message after 1 second
    setTimeout(() => {
        messageEl.innerText = '';
    }, 1000);
}

// --- Signup ---
const signupBtn = document.getElementById('signupBtn');
if (signupBtn) {
    signupBtn.addEventListener('click', async () => {
        const fullname = document.getElementById('signupFullName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user info in Firestore
            await setDoc(doc(db, "users", user.uid), {
                fullname: fullname,
                email: email,  // optional if you want to store the email too
                amount: 0
            });

            // Display a success message then redirect after a short delay
            displayMessage('Signup successful!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } catch (error) {
            displayMessage('Error: ' + error.message, 'error');
        }
    });
}

// --- Login ---
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            displayMessage('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } catch (error) {
            displayMessage('Error: ' + error.message, 'error');
        }
    });
}

// --- Dashboard (Show username, points, and uid) ---
if (document.getElementById('welcomeMessage')) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                document.getElementById('welcomeMessage').innerText = `Hello ${userData.username}`;
                document.getElementById('pointsDisplay').innerText = `Points earned: ${userData.amount}`;
                document.getElementById('userIdDisplay').innerText = user.uid;

                // Add copy user ID functionality
                const copyBtn = document.getElementById('copyUserIdBtn');
                if (copyBtn) {
                    copyBtn.addEventListener('click', () => {
                        navigator.clipboard.writeText(user.uid).then(() => {
                            displayMessage("User ID copied to clipboard!", 'success');
                        }).catch(err => {
                            displayMessage("Failed to copy User ID", 'error');
                        });
                    });
                }
            } else {
                displayMessage('User data not found!', 'error');
            }
        } else {
            window.location.href = 'auth.html';
        }
    });

    // --- Logout ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await signOut(auth);
            window.location.href = 'auth.html';
        });
    }
}