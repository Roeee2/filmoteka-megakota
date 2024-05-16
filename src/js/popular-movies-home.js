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
export async function popularMovies(page = 1, gallery) {
  try {
    const params = new URLSearchParams({
      api_key: '91f5af2219e63824428db203e9d0f8bf',
      page: page,
      per_page: 20,
    });
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?${params}`
    );
    const data = response.data;
    console.log(response.data);
    const { results, total_results } = data;
    if (results.length === 0) {
      gallery.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no movies matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.success(`Hooray! We found ${total_results} movies.`);
    }
    results.forEach(result => {
      const { poster_path, original_title, genre_ids, release_date } = result;
      const gallery = document.querySelector('.gallery-cards');
      const getReleaseYear = release_date.split('-')[0];
      const genres = makeGenresString(genre_ids);
      const filmCard = `<li class="film-card">
          <div class="film-cover">
          <img class="film-img"
          src="https://image.tmdb.org/t/p/original${poster_path}
          alt="${original_title}></div>
          <div class="film-desc">
          <p class="card-film-title">${original_title}</p>
          <p class="film-info">
          ${genre_ids}|${getReleaseYear}
          </p>
          </div>
        </li>`;
      gallery.insertAdjacentHTML('beforeend', filmCard);
    });
  } catch (error) {
    Notiflix.Notify.failure('Error while loading the movies', error);
    console.log(error);
  }
}
