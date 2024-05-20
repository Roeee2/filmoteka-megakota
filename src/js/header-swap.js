// document.addEventListener('DOMContentLoaded', () => {
//     // Select the "LOG IN" link. The last child in the .header-menu-list which is the "LOG IN" link
//     const loginLink = document.querySelector('.header-menu-list:nth-child(1)');

//     // Select the headers by their classes
//     const headBg = document.querySelector('.head-bg');
//     const headLibBg = document.querySelector('.head-lib-bg');

//     // Initial state to track whether the user is logged in
//     let isLoggedIn = false;

//     // Add an event listener to the "LOG IN" link
//     loginLink.addEventListener('click', event => {
//         // Prevent the default action of the link
//         event.preventDefault();

//         // Log the state before the click to debug
//         console.log('Before Click - isLoggedIn:', isLoggedIn);

//         // Toggle the state and update the text and visibility of headers accordingly
//         if (isLoggedIn) {
//             // User is currently logged in, log them out
//             loginLink.textContent = 'LOG IN';
//             headBg.style.display = 'block';
//             headLibBg.style.display = 'none';
//         } else {
//             // User is currently logged out, log them in
//             loginLink.textContent = 'LOG OUT';
//             headBg.style.display = 'none';
//             headLibBg.style.display = 'block';
//         }

//         // Toggle the logged-in state
//         isLoggedIn = !isLoggedIn;

//         // Log the state after the click to debug
//         console.log('After Click - isLoggedIn:', isLoggedIn);
//     });
// });