import { popularMovies } from './popular-movies-home';

const loader = document.getElementById('loader');

const displayLoader = () => {
  loader.classList.remove('hidden');
};

const hideLoader = () => {
  loader.classList.add('fade-out');

  setTimeout(() => {
    loader.classList.add('hidden');
    loader.classList.remove('fade-out');
  }, 500);
};

// Funkcje do wykonywania asynchronicznych operacji
const apiKey = '91f5af2219e63824428db203e9d0f8bf';
const apiUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

const fetchData = async () => {
  try {
    displayLoader();
    const response = await fetch(apiUrl);
    const data = await response.json();
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  } finally {
    hideLoader();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});
