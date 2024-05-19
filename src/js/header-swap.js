document.addEventListener('DOMContentLoaded', () => {
  const loginLink = document.querySelector('.header-menu-list a:last-child');
  const headBg = document.querySelector('.head-bg');
  const headLibBg = document.querySelector('.head-lib-bg');

  let isLoggedIn = false;

  loginLink.addEventListener('click', event => {
    event.preventDefault();

    if (isLoggedIn) {
      loginLink.textContent = 'LOG IN';
      headBg.style.display = 'block';
      headLibBg.style.display = 'none';
    } else {
      loginLink.textContent = 'LOG OUT';
      headBg.style.display = 'none';
      headLibBg.style.display = 'block';
    }

    isLoggedIn = !isLoggedIn;
  });
});
