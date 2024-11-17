import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyANxaputefbuPNWOVufchfXNTVbujVq7cE",
  authDomain: "mentorology-eb244.firebaseapp.com",
  databaseURL: "https://mentorology-eb244-default-rtdb.firebaseio.com",
  projectId: "mentorology-eb244",
  storageBucket: "mentorology-eb244.appspot.com",
  messagingSenderId: "482534930324",
  appId: "1:482534930324:web:d63e0d85ce3e46164e4181",
  measurementId: "G-60MF73SJ7L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'login.html';
  }

  const userNameElement = document.getElementById('userName');
  if (user) {
    userNameElement.textContent = user.displayName || 'User';
  } else {
    userNameElement.textContent = 'Guest';
  }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('Login successful');
      window.location.href = 'index.html';
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
    });
});