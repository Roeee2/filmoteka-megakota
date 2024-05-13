import Notiflix from 'notiflix';
import axios from 'axios';

let currentPage;
let totalPages;

export async function getDataAndCreatePagination() {
  try {
    const apiKey =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY1YWYyMjE5ZTYzODI0NDI4ZGIyMDNlOWQwZjhiZiIsInN1YiI6IjY2M2QxMjIyNjE1NmZkOTFhMWQ5YzIzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YjDAlipNxEuu_zkNrtX4U9u1MEBCqRKJKaJyuTM1i94';
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=1`
    );
    const data = response.data;
    totalPages = data.totalPages;
    currentPage = 1;
    createPagination(currentPage, totalPages);
  } catch (error) {
    Notiflix.Notify.failure('Error while collecting the data', error);
  }
}

export function createPagination(currentPage, totalPages) {
  //tworzenie kontenera na pagnację

  const paginationElement = document.querySelector('#pagination');
  paginationElement.innerHTML = '';

  //tworzenie strzałki w lewo przy pomocy encji HTML

  const prevPage = document.createElement('li');
  prevPage.innerHTML = `<a href="#" onclick="goToPage(${
    currentPage - 1
  })">&laquo</a>`;
  paginationElement.appendChild(prevPage);

  //tworzenie numerów stron + podświetlenie aktywnego numeru strony

  for (let i = 1; i <= totalPages; i++) {
    const page = document.createElement('li');
    page.innerHTML = `<a href="#" onclick="goToPage(${i})">${i}</a>`;
    if (i === currentPage) {
      page.querySelector('a').classList.add('active');
    }
    paginationElement.appendChild(page);
  }

  //tworzenie strzałki w prawo przy pomocy encji HTML

  const nextPage = document.createElement('li');
  nextPage.innerHTML = `<a href="#" onclick="goToPage(${
    currentPage + 1
  })">&raquo</a>`;
  paginationElement.appendChild(nextPage);
}

export function goToPage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    createPagination(currentPage, totalPages);
  }
}
