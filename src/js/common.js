import { createPagination } from './pagination';
import Notiflix from 'notiflix';
import axios from 'axios';

const apiKey = '91f5af2219e63824428db203e9d0f8bf';

const genresQuery = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
const getGenres = async () => {
  try {
    const response = await axios.get(genresQuery);
    return response.data.genres;
  } catch (error) {
    Notiflix.Notify.failure('Error while fetching genres', error);
    return [];
  }
};

const makeGenresString = async array => {
  try {
    const genres = await getGenres();
    const genreNames = array.map(id => {
      const genre = genres.find(gen => gen.id === id);
      return genre ? genre.name : 'Unknown';
    });
    return genreNames.join(', ');
  } catch (error) {
    Notiflix.Notify.failure('Error while processing genres', error);
    return 'Unknown';
  }
};

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

    const imgElement = document.getElementById(`film-${id}`);
    imgElement.addEventListener('click', () => {
      console.log(`Movie ID ${id} clicked`);
    });
  }
  createPagination(page, totalPages, 'popularMovies');
}
