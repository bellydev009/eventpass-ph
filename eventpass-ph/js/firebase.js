// js/firebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const firebaseConfig = {
  // Paste your firebaseConfig from Step 1 here
  apiKey: "AIzaSyC4G3Z6dX4Z0ydofOg8ADp414-QjUdEWNg",
  authDomain: "eventpass-ph.firebaseapp.com",
  projectId: "eventpass-ng",
  storageBucket: "eventpass-ng.firebasestorage.app",
  messagingSenderId: "669281256667",
  appId: "1:669281256667:web:3f020a50342c4c655738fe"
      measurementId: "G-XBT8Z192G6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc, getDocs };