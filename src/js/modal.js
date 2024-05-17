import { getFilmData } from './common';

const modal = document.getElementById('filmModal');
const galleryList = document.querySelector('ul.gallery-cards');

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('filmModal');
  const galleryList = document.querySelector('ul.gallery-cards');

  const openModal = () => {
    if (modal) {
      modal.classList.remove('is-hidden');
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

  const closeButton = document.querySelector('.modal-close-button');
  if (closeButton) {
    closeButton.onclick = closeModal;
  }

  galleryList.addEventListener('click', async ev => {
    // filmData.cover = ev.target.src;
    const filmCard = ev.target.closest('.film-card');
    filmId = filmCard.dataset.id;
    console.log(filmId);
    const filmData = await getFilmData(filmId);
    console.log(filmData);
    updateModalContent(filmData);
    openModal();
  });

  function updateModalContent(filmData) {
    const {
      poster_path,
      title,
      vote_average,
      vote_count,
      popularity,
      original_title,
      overview,
    } = filmData;
    document.getElementById('cover-image').src=`https://image.tmdb.org/t/p/original${poster_path}`;
    document.getElementById('movie-title').innerText = title;

    const votesElement = document.getElementById('film-votes');
    const votesSecondaryElement = document.getElementById(
      'film-votes-secondary'
    );
    // const votesInfo = votes.split(' ');
    // votesElement.innerText = votesInfo[0];
    // votesSecondaryElement.innerText = votesInfo[1] || 'N/A';

    document.getElementById('film-popularity').innerText = popularity;
    document.getElementById('film-original-title').innerText =
      original_title;
    // document.getElementById('film-genre').innerText = filmData.genre;

    // const descriptionElement = document.getElementById('film-description');
    // const descriptionParts = filmData.description.split('ABOUT');
    // descriptionElement.innerHTML = `ABOUT<p>${descriptionParts[1].trim()}</p>`;
  }

  // function updateModalContent(filmInfo) {
  //   document.getElementById('cover-image').src = poster_path;
  // document.getElementById('movie-title').innerText = filmData.title;

  // const votesElement = document.getElementById('film-votes');
  // const votesSecondaryElement = document.getElementById(
  //   'film-votes-secondary'
  // );
  // const votesInfo = filmData.votes.split(' ');
  // votesElement.innerText = votesInfo[0];
  // votesSecondaryElement.innerText = votesInfo[1] || 'N/A';

  // document.getElementById('film-popularity').innerText = filmData.popularity;
  // document.getElementById('film-original-title').innerText =
  //   filmData.originalTitle;
  // document.getElementById('film-genre').innerText = filmData.genre;

  // const descriptionElement = document.getElementById('film-description');
  // const descriptionParts = filmData.description.split('ABOUT');
  // descriptionElement.innerHTML = `ABOUT<p>${descriptionParts[1].trim()}</p>`;
  // }

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
