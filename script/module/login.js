import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyANxaputefbuPNWOVufchfXNTVbujVq7cE",
  authDomain: "mentorology-eb244.firebaseapp.com",
  projectId: "mentorology-eb244",
  storageBucket: "mentorology-eb244.appspot.com",
  messagingSenderId: "482534930324",
  appId: "1:482534930324:web:d63e0d85ce3e46164e4181",
  measurementId: "G-60MF73SJ7L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error [${errorCode}]: ${errorMessage}`);
    });
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log('User not logged in');
  } else {
    console.log('User logged in: ', user.email);
  }
});