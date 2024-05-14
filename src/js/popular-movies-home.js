import Notiflix from 'notiflix';
import axios from 'axios';
const apiKey = '91f5af2219e63824428db203e9d0f8bf';

export async function popularMovies() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure('Error while loading the movies', error);
    return null;
  }
}
