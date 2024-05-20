import { doc } from 'firebase/firestore';
import { popularMovies } from './popular-movies-home';
import { displayFromLocalStorage } from './common';

const gallery = document.querySelector('.gallery-cards');
let page = 1;
global.popularMovies = popularMovies;

document.addEventListener('DOMContentLoaded', () => {
  popularMovies(1);
  const watchedButton = document.querySelector('#btn-watched');
  watchedButton.addEventListener('click', ev => {
    displayFromLocalStorage('watched.');
  });
  const queueButton = document.querySelector('#btn-queue');
  queueButton.addEventListener('click', ev => {
    displayFromLocalStorage('queue.');
  });
});
