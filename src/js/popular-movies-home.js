import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/movie/day',
  params: { language: 'en-US' },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY1YWYyMjE5ZTYzODI0NDI4ZGIyMDNlOWQwZjhiZiIsInN1YiI6IjY2M2QxMjIyNjE1NmZkOTFhMWQ5YzIzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YjDAlipNxEuu_zkNrtX4U9u1MEBCqRKJKaJyuTM1i94',
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

export async function popularMovies(page, gallery, btnNextPage) {}
