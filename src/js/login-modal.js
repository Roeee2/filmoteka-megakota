const loginButton = document.getElementById("login");
const loginModal = document.getElementById("loginModal");
const loginModalCloseButton = document.getElementById("loginModalCloseButton");

loginButton.addEventListener("click", () => {
    loginModal.classList.remove('is-hidden');
})

loginModalCloseButton.addEventListener("click", () => {
    loginModal.classList.add('is-hidden');
})