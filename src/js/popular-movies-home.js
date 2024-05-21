import Notiflix from 'notiflix';
import axios from 'axios';
import { createPagination } from './pagination';
import { drawMovies } from './common';

const apiKey = '91f5af2219e63824428db203e9d0f8bf';

const genresQuery = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

export async function popularMovies(page = 1, gallery) {
  try {
    const params = new URLSearchParams({
      api_key: apiKey,
      page: page,
      per_page: 20,
    });
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?${params}`
    );
    const data = response.data;
    const { results, total_results } = data;

    // if (results.length === 0) {
    //   gallery.innerHTML = '';
    //   Notiflix.Notify.failure(
    //     'Sorry, there are no movies matching your search query. Please try again.'
    //   );
    // } else {
    //   Notiflix.Notify.success(`Hooray! We found ${total_results} movies.`);
    // }
    await drawMovies(results, page, data.total_pages);
  } catch (error) {
    Notiflix.Notify.failure('Error while loading the movies', error);
    console.log(error);
  }
}
