import { db, auth, collection, addDoc, getDocs } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

document.getElementById('waitlistForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const interests = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.nextElementSibling.textContent);

  try {
    await addDoc(collection(db, 'waitlist'), {
      name,
      email,
      phone,
      interests,
      timestamp: new Date()
    });
    document.getElementById('successModal').classList.remove('hidden');
    this.reset();
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Failed to join waitlist. Please try again.');
  }
});

async function displayEvents() {
  const eventList = document.querySelector('.event-grid');
  const querySnapshot = await getDocs(collection(db, 'events'));
  eventList.innerHTML = '';
  querySnapshot.forEach(doc => {
    const event = doc.data();
    eventList.innerHTML += `
      <div class="bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 class="font-bold text-xl mb-2">${event.title}</h3>
        <p class="text-gray-600">${event.date} | ${event.location}</p>
        <p class="text-gray-600">${event.description}</p>
        <button class="mt-4 btn-earthtone px-4 py-2 rounded-lg">Learn More</button>
      </div>
    `;
  });
}

// Fetch and display events from Firestore
document.addEventListener('DOMContentLoaded', async function() {
  const eventGrid = document.querySelector('.event-grid');
  if (!eventGrid) return;
  try {
    const querySnapshot = await getDocs(collection(db, 'events'));
    eventGrid.innerHTML = '';
    querySnapshot.forEach(doc => {
      const event = doc.data();
      eventGrid.innerHTML += `
        <div class="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 class="font-bold text-xl mb-2">${event.title || ''}</h3>
          <p class="text-gray-600">${event.date || ''} | ${event.location || ''}</p>
          <p class="text-gray-600">${event.description || ''}</p>
          <button class="mt-4 btn-earthtone px-4 py-2 rounded-lg">Learn More</button>
        </div>
      `;
    });
  } catch (error) {
    eventGrid.innerHTML = '<p class="text-center text-red-500">Failed to load events.</p>';
    console.error('Error fetching events:', error);
  }
});

document.addEventListener('DOMContentLoaded', displayEvents);

function closeModal() {
  document.getElementById('successModal').classList.add('hidden');
}

// User Authentication
const auth = getAuth();

// Sign Up Modal and Logic
function showSignUpModal() {
  document.getElementById('signUpModal').classList.remove('hidden');
}
function closeSignUpModal() {
  document.getElementById('signUpModal').classList.add('hidden');
}
function showLoginModal() {
  document.getElementById('loginModal').classList.remove('hidden');
}
function closeLoginModal() {
  document.getElementById('loginModal').classList.add('hidden');
}
document.addEventListener('DOMContentLoaded', () => {
  const signUpBtn = document.getElementById('signUpBtn');
  if (signUpBtn) signUpBtn.addEventListener('click', showSignUpModal);
  const closeBtn = document.getElementById('closeSignUpModal');
  if (closeBtn) closeBtn.addEventListener('click', closeSignUpModal);
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) loginBtn.addEventListener('click', showLoginModal);
  const closeLoginBtn = document.getElementById('closeLoginModal');
  if (closeLoginBtn) closeLoginBtn.addEventListener('click', closeLoginModal);
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    alert('Logged out successfully!');
    document.getElementById('logoutBtn').classList.add('hidden');
    document.getElementById('loginBtn').classList.remove('hidden');
    document.getElementById('signUpBtn').classList.remove('hidden');
  });
  displayEvents();
});

// User State Display
const userStateDisplay = document.getElementById('userStateDisplay');
onAuthStateChanged(auth, (user) => {
  if (user) {
    userStateDisplay.textContent = `Logged in as: ${user.email}`;
    userStateDisplay.classList.remove('hidden');
    document.getElementById('logoutBtn').classList.remove('hidden');
    document.getElementById('loginBtn').classList.add('hidden');
    document.getElementById('signUpBtn').classList.add('hidden');
  } else {
    userStateDisplay.textContent = '';
    userStateDisplay.classList.add('hidden');
    document.getElementById('logoutBtn').classList.add('hidden');
    document.getElementById('loginBtn').classList.remove('hidden');
    document.getElementById('signUpBtn').classList.remove('hidden');
  }
});

document.getElementById('signUpForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert('Sign up successful!');
    closeSignUpModal();
    this.reset();
  } catch (error) {
    alert('Sign up failed: ' + error.message);
  }
});

document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Login successful!');
    closeLoginModal();
    document.getElementById('logoutBtn').classList.remove('hidden');
    document.getElementById('loginBtn').classList.add('hidden');
    document.getElementById('signUpBtn').classList.add('hidden');
    this.reset();
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
});