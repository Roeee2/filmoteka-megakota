const studentsLink = document.querySelector('footer-link');
const studentsModal = document.querySelector('#studens-name-modal');
const studentsCloseButton = document.querySelector('students-close-button');

const openStudentsModal = () => {
  studentsModal.classList.remove('is-hidden');
};
const closeStudentsModal = () => {
  studentsModal.classList.add('is-hidden');
};
studentsLink.addEventListener('click', openStudentsModal);
studentsCloseButton.addEventListener('click', closeStudentsModal);
