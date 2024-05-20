import { drawMovies } from './common';
import { searchMovie, drawMovies } from './common';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.movie-searcher-form');
const gallery = document.querySelector('.gallery-cards');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const queryInput = document.querySelector('.movie-searcher-input');
  const query = queryInput.value;
  if (!query) {
    Notiflix.Notify.info('Please enter a movie name.');
    return;
  }
  global.page = 1;
  searchMovie(query, 1).then(async response => {
    const results = response.results;
    await drawMovies(
      results,
      global.page,
      response.total_pages,
      'searchMoviePagination'
    );
  });
});
