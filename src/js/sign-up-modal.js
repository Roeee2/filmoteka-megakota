const signupButton = document.getElementById("signup-menu");
const signupModal = document.getElementById("signupModal");
const signupModalCloseButton = document.getElementById("signupModalCloseButton");

signupButton.addEventListener("click", () => {
    signupModal.classList.remove('is-hidden');
})

signupModalCloseButton.addEventListener("click", () => {
    signupModal.classList.add('is-hidden');
})