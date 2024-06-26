import { createPagination } from './pagination';
import Notiflix from 'notiflix';
import axios from './customAxios';
import * as firebase from './firebase';
export { makeGenresString, searchMovie };
initHeader();
const apiKey = '91f5af2219e63824428db203e9d0f8bf';
let allGenres = [];
const genresQuery = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
const getGenres = async () => {
  try {
    if (allGenres.length > 0) {
      return allGenres;
    }
    const response = await axios.get(genresQuery);
    allGenres = response.data.genres;
    return allGenres;
  } catch (error) {
    Notiflix.Notify.failure('Error while fetching genres', error);
    console.log(error);
    return [];
  }
};
async function searchMovie(query, page) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&per_page=20&adult=false&api_key=${apiKey}`
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
export async function drawMovies(results, page, totalPages, funcName) {
  const galleryElement = document.querySelector('.gallery-cards');
  galleryElement.innerHTML = '';
  for (const result of results) {
    const {
      id,
      poster_path,
      original_title,
      genre_ids,
      release_date,
      vote_average,
    } = result;
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
            <p class="film-info">${genres} | ${getReleaseYear} |<span class="card-rating-home">${vote_average.toFixed(
      1
    )}</span></p>
          </div>
        </li>`;
    galleryElement.insertAdjacentHTML('beforeend', filmCard);
    const imgElement = document.getElementById(`film-${id}`);
  }
  createPagination(
    page,
    totalPages,
    funcName !== undefined ? funcName : 'popularMovies'
  );
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
      setLogIn();
      const headBg = document.getElementById('head-bg');
      const hheadBgeadLibBg = document.getElementById('head-lib-bg');
      headBg.style.display = 'none';
      headLibBg.style.display = 'block';
      const loginModal = document.getElementById('loginModal');
      loginModal.classList.add('is-hidden');
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
        Notiflix.Notify.failure('A new account has been added!', error);
        const signupModal = document.getElementById('signupModal');
        signupModal.classList.add('is-hidden');
        console.log('ok');
        const user = userCredential.data.user;
        console.log(user);
      })
      .catch(error => {
        console.log('nok');
        const errorCode = error.code;
        const errorMessage = error.message;
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
      setLogOut();
      const headBg = document.getElementById('head-bg');
      const headLibBg = document.getElementById('head-lib-bg');
      headBg.style.display = 'block';
      headLibBg.style.display = 'none';
    })
    .catch(error => {
      console.log(error);
    });
});
const logoutButtonMyLib = document.getElementById('logout-menu-myliblary');
logoutButtonMyLib.addEventListener('click', ev => {
  firebase
    .tryLogoutUser()
    .then(data => {
      const userEmail = localStorage.getItem('userEmail');
      localStorage.removeItem('userEmail');
      console.log(`Unlogged ${userEmail}`);
      setLogOut();
      const headBg = document.getElementById('head-bg');
      const headLibBg = document.getElementById('head-lib-bg');
      headBg.style.display = 'block';
      headLibBg.style.display = 'none';
    })
    .catch(error => {
      console.log(error);
    });
});
const mylibMenuMyliblary = document.getElementById('mylib-menu-myliblary');
mylibMenuMyliblary.addEventListener('click', ev => {
  const headBg = document.getElementById('head-bg');
  const headLibBg = document.getElementById('head-lib-bg');
  headBg.style.display = 'none';
  headLibBg.style.display = 'block';
});

function setLogIn() {
  const myliblaryMenu = document.getElementById('myliblary-menu');
  const loginMenu = document.getElementById('login-menu');
  const signupMenu = document.getElementById('signup-menu');
  const logoutMenu = document.getElementById('logout-menu');
  const emailMenu = document.getElementById('email-menu');
  const emailMenuMyLib = document.getElementById('email-menu-myliblary');
  const userEmail = localStorage.getItem('userEmail');
  loginMenu.style.display = 'none';
  signupMenu.style.display = 'none';
  logoutMenu.style.display = 'block';
  emailMenu.style.display = 'block';
  emailMenu.textContent = `Hello, ${userEmail}!`;
  emailMenuMyLib.textContent = `Hello, ${userEmail}!`;
  myliblaryMenu.style.display = 'block';
}
function setLogOut() {
  const myliblaryMenu = document.getElementById('myliblary-menu');
  const loginMenu = document.getElementById('login-menu');
  const signupMenu = document.getElementById('signup-menu');
  const logoutMenu = document.getElementById('logout-menu');
  const emailMenu = document.getElementById('email-menu');
  const emailMenuMyLib = document.getElementById('email-menu-myliblary');
  loginMenu.style.display = 'block';
  signupMenu.style.display = 'block';
  logoutMenu.style.display = 'none';
  emailMenu.style.display = 'none';
  emailMenu.textContent = ``;
  emailMenuMyLib.textContent = ``;
  //nmyliblaryMenu.style.display = 'none';
}
export function isUserEmailStored() {
  const userEmail = localStorage.getItem('userEmail');
  return userEmail !== null;
}
function initHeader() {
  if (isUserEmailStored()) {
    setLogIn();
  } else {
    setLogOut();
  }
}
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
export async function searchMoviePagination(page) {
  const queryInput = document.querySelector('.movie-searcher-input');
  const query = queryInput.value;
  if (!query) {
    Notiflix.Notify.info('Please enter a movie name.');
    return;
  }
  global.page = page;
  searchMovie(query, page).then(async response => {
    const results = response.results;
    await drawMovies(
      results,
      global.page,
      response.total_pages,
      'searchMoviePagination'
    );
  });
}
