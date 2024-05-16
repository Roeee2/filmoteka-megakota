import Notiflix from 'notiflix';
import axios from 'axios';

let currentPage;
let totalPages;

export async function getDataAndCreatePagination() {
  try {
    const apiKey = '91f5af2219e63824428db203e9d0f8bf';
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=1`
    );
    const data = response.data;
    totalPages = data.total_pages;
    currentPage = 1;
    createPagination(currentPage, totalPages);
  } catch (error) {
    Notiflix.Notify.failure('Error while collecting the data', error);
  }
}

export function createPagination(currentPage, totalPages, funcName) {
  //tworzenie kontenera na pagnację

  const paginationElement = document.querySelector('#pagination');
  paginationElement.innerHTML = '';

  //tworzenie strzałki w lewo przy pomocy encji HTML

  const prevPage = document.createElement('li');
  prevPage.innerHTML = `<a href="#" onclick="${funcName}(${
    currentPage - 1
  })">&laquo</a>`;
  paginationElement.appendChild(prevPage);

  //tworzenie numerów stron + podświetlenie aktywnego numeru strony
  const page = document.createElement('li');
  page.innerHTML = `<a href="#" onclick="${funcName}(1)">1</a>`;
  if (1 === currentPage) {
    page.querySelector('a').classList.add('active');
  }
  paginationElement.appendChild(page);

  if (currentPage >= 6) {
    const page = document.createElement('li');
    page.innerHTML = `<a href="#"">...</a>`;
    paginationElement.appendChild(page);
  }
  for (
    let i = currentPage - 2 < 1 ? 2 : currentPage - 2;
    i <= totalPages;
    i++
  ) {
    const page = document.createElement('li');
    page.innerHTML = `<a href="#" onclick="${funcName}(${i})">${i}</a>`;
    if (i === currentPage) {
      page.querySelector('a').classList.add('active');
    }
    paginationElement.appendChild(page);
    if (i > currentPage + 1) {
      break;
    }
  }

  //tworzenie strzałki w prawo przy pomocy encji HTML

  const nextPage = document.createElement('li');
  nextPage.innerHTML = `<a href="#" onclick="${funcName}(${
    currentPage + 1
  })">&raquo</a>`;
  paginationElement.appendChild(nextPage);
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    createPagination(currentPage, totalPages);
  }
}
