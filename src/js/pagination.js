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
    createPagination(currentPage, totalPages, 'goToPage');
  } catch (error) {
    Notiflix.Notify.failure('Error while collecting the data', error);
  }
}

export function createPagination(currentPage, totalPages, funcName) {
  //tworzenie kontenera na pagnację

  const paginationElement = document.querySelector('#pagination');
  paginationElement.innerHTML = '';

  const createPageItem = page => {
    const pageItem = document.createElement('li');
    pageItem.innerHTML = `<a href="#" onclick="${funcName}(${page})">${page}</a>`;
    if (page === currentPage) {
      pageItem.querySelector('a').classList.add('active');
    }
    return pageItem;
  };

  // Tworzenie strzałki w lewo
  if (currentPage > 1) {
    const prevPage = document.createElement('li');
    prevPage.innerHTML = `<a href="#" onclick="${funcName}(${
      currentPage - 1
    })">&laquo</a>`;
    paginationElement.appendChild(prevPage);
  }

  // Dodawanie pierwszej strony
  paginationElement.appendChild(createPageItem(1));

  // Dodawanie trzech kropek na poczatku
  if (currentPage > 4) {
    const dots = document.createElement('li');
    dots.innerHTML = `<a href="#">...</a>`;
    paginationElement.appendChild(dots);
  }

  // Dodawanie numerów stron wokół currentPage
  for (
    let i = Math.max(2, currentPage - 2);
    i <= Math.min(currentPage + 2, totalPages - 1);
    i++
  ) {
    paginationElement.appendChild(createPageItem(i));
  }

  // Dodawanie trzech kropek jeśli currentPage jest blisko końca
  if (currentPage < totalPages - 3) {
    const dots = document.createElement('li');
    dots.innerHTML = `<a href="#">...</a>`;
    paginationElement.appendChild(dots);
  }

  // Dodawanie ostatniej strony
  if (totalPages > 1) {
    paginationElement.appendChild(createPageItem(totalPages));
  }

  // Tworzenie strzalki w prawo
  if (currentPage < totalPages) {
    const nextPage = document.createElement('li');
    nextPage.innerHTML = `<a href="#" onclick="${funcName}(${
      currentPage + 1
    })">&raquo</a>`;
    paginationElement.appendChild(nextPage);
  }
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    createPagination(currentPage, totalPages, 'goToPage');
  }
}

// inicjowanie paginacji
getDataAndCreatePagination();
