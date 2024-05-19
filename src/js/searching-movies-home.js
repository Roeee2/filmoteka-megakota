import { makeGenresString } from "./common";
import { searchMovie } from "./common";
import Notiflix from "notiflix";

const searchForm = document.querySelector('.movie-searcher-form');
const gallery = document.querySelector('.gallery-cards');

searchForm.addEventListener('submit', event => {
event.preventDefault();
const queryInput = document.querySelector('.movie-searcher-input')
const query = queryInput.value;
if (!query) {
  Notiflix.Notify.info('Please enter a movie name.');
  return;
}
console.log(query)
gallery.innerHTML = '';
// page = 1;
searchMovie(query)
.then(async (response) => {
const results = response.results;
for (const result of results) {
  const { id, poster_path, original_title, genre_ids, release_date } = result;
  const getReleaseYear = release_date
      ? release_date.split('-')[0]
      : 'Unknown';
  const genres = await makeGenresString(genre_ids);
  const filmCard = `
        <li class="film-card" id="film-card-${id}">
          <div class="film-cover">
            <img class="film-img" id="film-${id}" 
            src="https://image.tmdb.org/t/p/original${poster_path}" 
            alt="${original_title}">
          </div>
          <div class="film-desc">
            <p class="card-film-title">${original_title}</p>
            <p class="film-info">${genres} | ${getReleaseYear}</p>
          </div>
        </li>`;
        gallery.insertAdjacentHTML('beforeend', filmCard);
}
})
})