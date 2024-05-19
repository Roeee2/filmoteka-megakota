const loginMenuButton = document.getElementById("login-menu");
const loginModal = document.getElementById("loginModal");
const loginModalCloseButton = document.getElementById("loginModalCloseButton");

loginMenuButton.addEventListener("click", () => {
    loginModal.classList.remove('is-hidden');
})

loginModalCloseButton.addEventListener("click", () => {
    loginModal.classList.add('is-hidden');
})