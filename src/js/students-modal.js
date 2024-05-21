const signupButton = document.getElementById('footer-link');
const signupModal = document.getElementById('studentsModal');
const signupModalCloseButton = document.getElementById(
  'studentModalCloseButton'
);

signupButton.addEventListener('click', () => {
  signupModal.classList.remove('is-hidden');
});

signupModalCloseButton.addEventListener('click', () => {
  signupModal.classList.add('is-hidden');
});
