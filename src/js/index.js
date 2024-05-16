import { popularMovies } from './popular-movies-home';

const gallery = document.querySelector('.gallery-cards');
let page = 1;
global.popularMovies = popularMovies;

document.addEventListener('DOMContentLoaded', () => {
  popularMovies(1);
  // getDataAndCreatePagination();
});
