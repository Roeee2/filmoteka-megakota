document.addEventListener('DOMContentLoaded', function () {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTZlMDQwYzc3MTI4ZDYyNjJlODg5ZmUzZjY0MjZkYiIsInN1YiI6IjY2NDFjNjU4OTJkNzFkMjc0NWMxOWNjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JkUujFTHumJrJUsJqtxU3nDAX4Q4nDga6Q53jbgPY88',
    },
  };

  function searchMovie(query) {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

  const inputElement = document.querySelector('#input-movie');
  if (inputElement) {
    inputElement.addEventListener('blur', function (event) {
      const valueInput = event.target.value;
      searchMovie(valueInput);
    });
  } else {
    console.error("Element with ID 'input-movie' not found.");
  }
});
