import { drawMovies } from './common';
import { searchMovie, drawMovies } from './common';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.movie-searcher-form');
const gallery = document.querySelector('.gallery-cards');
const notificationHeader = document.querySelector('p.query-notification');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const queryInput = document.querySelector('.movie-searcher-input');
  const query = queryInput.value;

  if (!query) {
    Notiflix.Notify.info('Please enter a movie name.');
    notificationHeader.textContent =
      'Search result not successful. Enter the correct movie name and try again.';
    return;
  }

  global.page = 1;
  searchMovie(query, 1).then(async response => {
    if (!query) {
      Notiflix.Notify.info('Please enter a movie name.');
      return;
    }
    const results = response.results
    const totalResults = response.total_results;
    if (results.length === 0) {
      gallery.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no movies matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.success(`Hooray! We found ${totalResults} movies.`);
    }
    await drawMovies(
      results,
      global.page,
      response.total_pages,
      'searchMoviePagination'
    );
  });
});

