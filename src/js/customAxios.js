import axios from 'axios';

const loader = document.getElementById('loader-container');

function showLoader() {
  loader.classList.add('show');
}

function hideLoader() {
  loader.classList.remove('show');
}

const customAxios = axios.create({
  timeout: 1000,
});

// Add a request interceptor
customAxios.interceptors.request.use(
  function (config) {
    showLoader();
    return config;
  },
  function (error) {
    hideLoader();
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  function (response) {
    hideLoader();
    return response;
  },
  function (error) {
    hideLoader();
    return Promise.reject(error);
  }
);

export default customAxios;
