

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpyzls0Qw3T-1wN7AeqFZNZN1jUu_hCFo",
  authDomain: "behind-11a.firebaseapp.com",
  projectId: "behind-11a",
  storageBucket: "behind-11a.appspot.com",
  messagingSenderId: "58433690789",
  appId: "1:58433690789:web:06aff504b0cd6d96b1c14c"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Log In with Google
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  
  // Firebase Email/Password login
  signInWithEmailPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`Welcome ${user.displayName || user.email}`);
      window.location.href = "main.html"; // Redirect to main page after login
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});

// ✅ Logout (optional button with id="logoutBtn")
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => location.href = "index.html");
  });
}

// ✅ Optional redirect if not logged in
onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  const isMain = path.endsWith("main.html");
  if (!user && !isMain) {
    alert("Please log in first.");
    window.location.href = "login.html"; // Ensure user can't access main page without login
  }
});
