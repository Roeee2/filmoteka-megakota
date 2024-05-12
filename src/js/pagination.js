import axios from 'axios';

export async function getDataAndCreatePagination() {
  try {
    const response = await axios.get;
    ('https://api.themoviedb.org/3/trending/movie/day');
    const data = response.data;
    totalPages = data.totalPages;
    currentPage = 1;
    createPagination(currentPage, totalPages);
  } catch (error) {
    console.error('Error while collecting the data', error);
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

  for (let i = 0; i <= totalPages; i++) {
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
