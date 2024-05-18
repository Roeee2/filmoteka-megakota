import { getFilmData } from './common';

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('filmModal');
  const galleryList = document.querySelector('ul.gallery-cards');

  const openModal = () => {
    if (modal) {
      modal.classList.remove('is-hidden');
      const backdrop = document.querySelector('.backdrop');
      backdrop.addEventListener('click', closeModalOutside);
      document.addEventListener('keydown', closeModalOnEscKey);
      modal.style.overflow = 'auto';
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.add('is-hidden');
      const backdrop = document.querySelector('.backdrop');
      backdrop.removeEventListener('click', closeModalOutside);
      document.removeEventListener('keydown', closeModalOnEscKey);
      modal.style.overflow = 'hidden';
      document.body.style.overflow = 'auto';
    }
  };

  const closeModalOnEscKey = event => {
    if (event.key === 'Escape') {
      closeModal();
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
    if (ev.target.tagName === 'IMG') {
      const filmId = ev.target.id.split('-')[1];
      const filmInfo = await getFilmData(filmId);

      if (filmInfo) {
        updateModalContent(filmInfo);
        openModal();
      }
    }
  });

  const updateModalContent = filmData => {
    document.getElementById(
      'cover-image'
    ).src = `https://image.tmdb.org/t/p/original${filmData.poster_path}`;
    document.getElementById('movie-title').innerText = filmData.original_title;

    document.getElementById('film-votes').innerText =
      filmData.vote_average.toFixed(1);
    document.getElementById('film-votes-secondary').innerText =
      filmData.vote_count;
    document.getElementById('film-popularity').innerText = Math.round(
      filmData.popularity
    );
    document.getElementById('film-original-title').innerText =
      filmData.original_title;
    document.getElementById('film-genre').innerText = filmData.genres
      .map(g => g.name)
      .join(', ');

    document.getElementById(
      'film-description'
    ).innerHTML = `<h3>ABOUT</h3><p>${filmData.overview}</p>`;
  };

  const addToWatched = () => {
    console.log('Added to watched');
  };

  const addToQueue = () => {
    console.log('Added to queue');
  };

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

export async function drawMovies(results, page, totalPages) {
  const galleryElement = document.querySelector('.gallery-cards');
  galleryElement.innerHTML = '';

  for (const result of results) {
    const { id, poster_path, original_title, genre_ids, release_date } = result;

    const getReleaseYear = release_date.split('-')[0];
    const genres = await makeGenresString(genre_ids);
    const filmCard = `
        <li class="film-card" id="film-card-${id}">
          <div class="film-cover">
            <img class="film-img" id="film-${id}" src="https://image.tmdb.org/t/p/original${poster_path}" alt="${original_title}">
          </div>
          <div class="film-desc">
            <p class="card-film-title">${original_title}</p>
            <p class="film-info">${genres} | ${getReleaseYear}</p>
          </div>
        </li>`;
    galleryElement.insertAdjacentHTML('beforeend', filmCard);
  }

  createPagination(page, totalPages, 'popularMovies');
}
