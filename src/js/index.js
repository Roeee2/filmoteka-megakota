import { popularMovies } from './popular-movies-home';
import { getDataAndCreatePagination } from './pagination';

const gallery = document.querySelector('.gallery-cards');
let page = 1;

document.addEventListener('DOMContentLoaded', () => {
  popularMovies();

  getDataAndCreatePagination();
});
