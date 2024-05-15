import Notiflix from 'notiflix';
import axios from 'axios';



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
    const data  = response.data;
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
      const filmCard = `<li class="film-card">
          <div class="film-cover">
          <img class="film-img"src="https://image.tmdb.org/t/p/original${poster_path}alt="${original_title}"
          </div>
          <div class="film-desc">
          <p class="film-title">${original_title}</p>
          <p class="film-info">
          ${genre_ids}
          |
          ${release_date}
          </p>
          </div>
        </li>`;
      gallery.insertAdjacentHTML('beforeend', filmCard);
    });
  } catch (error) {
    Notiflix.Notify.failure('Error while loading the movies', error);
    return null;
  }
}
