import { createPagination } from './pagination';
import Notiflix from 'notiflix';
import axios from 'axios';
import * as firebase from "./firebase";
export { makeGenresString, searchMovie };

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

async function searchMovie(query) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&adult=false&api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching film data:', error);
    return null;
  }
}

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

export async function getFilmData(filmId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmId}?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching film data:', error);
    return null;
  }
}

export async function drawMovies(results, page, totalPages) {
  const galleryElement = document.querySelector('.gallery-cards');
  galleryElement.innerHTML = '';
  for (const result of results) {
    const { id, poster_path, original_title, genre_ids, release_date } = result;

    const getReleaseYear = release_date
      ? release_date.split('-')[0]
      : 'Unknown';
    const genres = await makeGenresString(genre_ids);
    const filmCard = `
        <li class="film-card" id="film-card-${id}">
          <div class="film-cover">
            <img class="film-img" id="film-${id}" src="https://image.tmdb.org/t/p/original${poster_path}" alt="${original_title}">
          </div>
          <div class="film-desc">
            <p class="card-film-title">${original_title}</p>
            <p class="film-info">${genres} | ${getReleaseYear}</p>
          </div>
        </li>`;
    galleryElement.insertAdjacentHTML('beforeend', filmCard);

    const imgElement = document.getElementById(`film-${id}`);
  }
  if (page > 0) {
    createPagination(page, totalPages, 'popularMovies');
  }
}

const loginButton = document.getElementById('login-submit');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');

loginButton.addEventListener('click', ev => {
  ev.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  console.log(email);
  console.log(password);

  firebase
    .tryLoginUser(email, password)
    .then(userCredential => {
      const user = userCredential.data.user;
      console.log(user);
      const userEmail = user.email;
      localStorage.setItem('userEmail', userEmail);
      console.log(`Logged ${userEmail}`);

      const loginMenu = document.getElementById('login-menu');
      const signupMenu = document.getElementById('signup-menu');
      const logoutMenu = document.getElementById('logout-menu');
      const emailMenu = document.getElementById('email-menu');

      loginMenu.classList.add('is-hidden');
      signupMenu.classList.add('is-hidden');
      logoutMenu.classList.remove('is-hidden');
      emailMenu.classList.remove('is-hidden');
      emailMenu.textContent = `Hello, ${userEmail}!`;
    })
    .catch(error => {
      const errorCode = error.error.code;
      const errorMessage = error.error.message;
      console.log(errorCode);
      console.log(errorMessage);
      console.log(`Login failed`);
    });
});

const submitButton = document.getElementById('signup-submit');
const emailInputSignup = document.getElementById('email-input-signup');
const passwordInputSignup = document.getElementById('password-input-signup');
const confirmPasswordInputSignup = document.getElementById(
  'confirmPassword-input-signup'
);

submitButton.addEventListener('click', ev => {
  ev.preventDefault();
  const email = emailInputSignup.value;
  const password = passwordInputSignup.value;
  const passwordConf = confirmPasswordInputSignup.value;

  console.log(email);
  console.log(password);

  if (password === passwordConf) {
    firebase
      .tryCreateUser(email, password)
      .then(userCredential => {
        console.log('ok');
        const user = userCredential.data.user;
        console.log(user);
      })
      .catch(error => {
        console.log('nok');
        const errorCode = error.error.code;
        const errorMessage = error.error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  } else {
    console.log('pass nok');
  }
});

const logoutButton = document.getElementById('logout-menu');

logoutButton.addEventListener('click', ev => {
  firebase
    .tryLogoutUser()
    .then(data => {
      const userEmail = localStorage.getItem('userEmail');
      localStorage.removeItem('userEmail');
      console.log(`Unlogged ${userEmail}`);

      const loginMenu = document.getElementById('login-menu');
      const signupMenu = document.getElementById('signup-menu');
      const logoutMenu = document.getElementById('logout-menu');
      const emailMenu = document.getElementById('email-menu');

      loginMenu.classList.remove('is-hidden');
      signupMenu.classList.remove('is-hidden');
      logoutMenu.classList.add('is-hidden');
      emailMenu.classList.add('is-hidden');
      emailMenu.textContent = ``;
    })
    .catch(error => {
      console.log(error);
    });
});

export async function displayFromLocalStorage(pageKey) {
  const movies = [];
  const keys = Object.keys(localStorage);
  for (const key of keys) {
    if (key.startsWith(pageKey)) {
      const movieData = JSON.parse(localStorage.getItem(key));
      movieData.genre_ids = movieData.genres.map(genre => genre.id);
      movies.push(movieData);
    }
  }
  drawMovies(movies, 0, 0);
}
