import { popularMovies } from './popular-movies-home';
import {
  getDataAndCreatePagination,
  createPagination,
  goToPage,
} from './pagination';

document.addEventListener('DOMContentLoaded', () => {
  getDataAndCreatePagination();
});
