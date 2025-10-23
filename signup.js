// signup.js
const signupForm = document.getElementById("signupForm");
const signupBtn = document.getElementById("signupBtn");
const message = document.getElementById("message");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = document.getElementById("signupFullName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  // Animated message
  message.style.color = "blue";
  message.textContent = "Creating Account...";
  let dots = 0;
  const loading = setInterval(() => {
    dots = (dots + 1) % 4;
    message.textContent = "Creating Account" + ".".repeat(dots);
  }, 500);

  // Firebase signup
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      clearInterval(loading);
      message.style.color = "green";
      message.textContent = "Account created successfully! Please wait...";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    })
    .catch((error) => {
      clearInterval(loading);
      message.style.color = "red";
      message.textContent = error.message;
    });
});