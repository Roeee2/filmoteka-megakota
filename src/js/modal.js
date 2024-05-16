const filmData = {
  cover: '../images/film@1x.jpg',
  title: 'A FISTFUL OF LEAD',
  votes: '7.3 1260',
  popularity: '100.2',
  originalTitle: 'A FISTFUL OF LEAD',
  genre: 'Western',
  description:
    "ABOUT  Four of the West's most infamous outlaws assemble to steal a huge stash of gold from the most corrupt settlement of the gold rush towns. But not all goes to plan one is killed and the other three escapes with bags of gold hide out in the abandoned gold mine where they happen across another gang of three – who themselves were planning to hit the very same bank! As tensions rise, things go from bad to worse as they realise the bags of gold are filled with lead... they've been double crossed – but by who and how?",
};

const modal = document.getElementById('filmModal');
const galleryList = document.querySelector('ul.gallery-cards');

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('filmModal');
  const galleryList = document.querySelector('ul.gallery-cards');

  const openModal = () => {
    if (modal) {
      modal.classList.remove('is-hidden');
      updateModalContent();
      const backdrop = document.querySelector('.backdrop');
      backdrop.addEventListener('click', closeModalOutside);
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.add('is-hidden');
      const backdrop = document.querySelector('.backdrop');
      backdrop.removeEventListener('click', closeModalOutside);
    }
  };

  const closeModalOutside = event => {
    const modalContent = document.querySelector('.modal-content');
    if (!modalContent.contains(event.target)) {
      closeModal();
    }
  };

  galleryList.addEventListener('click', ev => {
    filmData.cover = ev.target.src;
    updateModalContent(filmData);
    openModal();
  });

  const closeButton = document.querySelector('.modal-close-button');
  if (closeButton) {
    closeButton.onclick = closeModal;
  }

  function updateModalContent(filmData) {
    document.getElementById('cover-image').src = filmData.cover;
    document.getElementById('movie-title').innerText = filmData.title;

    const votesElement = document.getElementById('film-votes');
    const votesSecondaryElement = document.getElementById(
      'film-votes-secondary'
    );
    const votesInfo = filmData.votes.split(' ');
    votesElement.innerText = votesInfo[0];
    votesSecondaryElement.innerText = votesInfo[1] || 'N/A';

    document.getElementById('film-popularity').innerText = filmData.popularity;
    document.getElementById('film-original-title').innerText =
      filmData.originalTitle;
    document.getElementById('film-genre').innerText = filmData.genre;

    const descriptionElement = document.getElementById('film-description');
    const descriptionParts = filmData.description.split('ABOUT');
    descriptionElement.innerHTML = `ABOUT<p>${descriptionParts[1].trim()}</p>`;
  }

  function addToWatched() {
    console.log('Dodano do obejrzanych');
  }

  function addToQueue() {
    console.log('Dodano do kolejki');
  }

  const watchedButton = document.querySelector(
    '.modal-buttons button:nth-child(1)'
  );
  const queueButton = document.querySelector(
    '.modal-buttons button:nth-child(2)'
  );

  if (watchedButton) {
    watchedButton.onclick = addToWatched;
  }

  if (queueButton) {
    queueButton.onclick = addToQueue;
  }
});
