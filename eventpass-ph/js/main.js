document.getElementById('waitlistForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('successModal').classList.remove('hidden');
  this.reset();
});

function closeModal() {
  document.getElementById('successModal').classList.add('hidden');
}