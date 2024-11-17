import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, updateProfile, updateEmail, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

document.getElementById('profileForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const displayName = document.getElementById('displayName').value;
  const email = document.getElementById('email').value;
  const messageElement = document.getElementById('message');
  const user = auth.currentUser;

  if (user) {
    updateProfile(user, { displayName })
      .then(() => {
        return updateEmail(user, email);
      })
      .then(() => {
        messageElement.textContent = 'Profile updated successfully';
        messageElement.style.color = '#388e3c';
      })
      .catch((error) => {
        messageElement.textContent = `Error: ${error.message}`;
        messageElement.style.color = '#d32f2f';
      });
  }
});

document.getElementById('signOutButton').addEventListener('click', () => {
signOut(auth).then(() => {
console.log("User signed out successfully.");
window.location.href = 'login.html';
}).catch((error) => {
console.error("Error signing out: ", error);
});
});