// Przykładowe dane do wyświetlenia w oknie modalnym
const filmData = {
  cover: '../images/film@1x.jpg',
  title: 'A FISTFUL OF LEAD',
  votes: '7.3  1260',
  popularity: '100.2',
  originalTitle: 'A FISTFUL OF LEAD',
  genre: 'Western',
  description:
    'ABOUT  Four of the West’s most infamous outlaws assemble to steal a huge stash of gold from the most corrupt settlement of the gold rush towns. But not all goes to plan one is killed and the other three escapes with bags of gold hide out in the abandoned gold mine where they happen across another gang of three – who themselves were planning to hit the very same bank! As tensions rise, things go from bad to worse as they realise the bags of gold are filled with lead... they’ve been double crossed – but by who and how?',
};

// Otwórz okno modalne
document.addEventListener('DOMContentLoaded', () => {
  const openModal = () => {
    const modal = document.getElementById('filmModal');
    if (modal) {
      modal.classList.remove('is-hidden');
    }
  };

  const filmCard = document.getElementById('film-card');
  if (filmCard) {
    filmCard.onclick = openModal;
  }

  const closeButton = document.querySelector('.modal-close-button');
  if (closeButton) {
    closeButton.onclick = closeModal;
  }

  const filmCover = document.getElementById('cover-image');
  if (filmCover) {
    filmCover.src = './images/film@1x.jpg';
  }

  // Sprawdź inne elementy i upewnij się, że istnieją
  //  const filmTitle = document.getElementById('movie-title');
  // if (filmTitle) {
  // filmTitle.innerText = 'A FISTFUL OF LEAD';
  // } else {
  // console.error("Nie można znaleźć elementu 'movie-title'.");
  // }

  // Ustaw wartości w oknie modalnym
  function updateModalContent() {
    document.getElementById('cover-image').src = filmData.cover;
    document.getElementById('movie-title').innerText = filmData.title;

    const votesElement = document.getElementById('film-votes');
    const votesSecondaryElement = document.getElementById(
      'film-votes-secondary'
    );

    const votesInfo = filmData.votes.split(' ');
    votesElement.innerText = votesInfo[0]; // Ustaw głosy (7.3)
    votesSecondaryElement.innerText = votesInfo[1] || 'N/A'; // Ustaw liczbę (1260)

    // Stylizacja informacji o głosach
    votesElement.classList.add('film-votes');
    votesSecondaryElement.classList.add('film-votes-secondary');

    document.getElementById('film-popularity').innerText = filmData.popularity;
    document.getElementById('film-original-title').innerText =
      filmData.originalTitle;
    document.getElementById('film-genre').innerText = filmData.genre;

    // Dodaj nowy akapit po słowie "ABOUT"
    const descriptionElement = document.getElementById('film-description');
    const descriptionParts = filmData.description.split('ABOUT');
    descriptionElement.innerHTML = `ABOUT<p>${descriptionParts[1].trim()}</p>`;
  }
  // Zamknij okno modalne

  function closeModal() {
    const modal = document.getElementById('filmModal');
    if (modal) {
      modal.classList.add('is-hidden');
    }
  }

  // Wywołaj funkcję aktualizacji treści modalu po otwarciu
  openModal();
  updateModalContent();

  // Przykładowe funkcje dla przycisków
  function addToWatched() {
    console.log('Dodano do obejrzanych');
  }

  function addToQueue() {
    console.log('Dodano do kolejki');
  }
});
