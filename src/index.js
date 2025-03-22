import { fetchBreeds, fetchCatByBreed } from './cat-api';

// Variabilă pentru a stoca instanța SlimSelect
let slimSelectInstance = null;

// Funcție pentru a popula select-ul cu opțiuni de rase
const populateBreedSelect = (breeds) => {
  const breedSelect = document.getElementById('breed-select');
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
};

// Funcție pentru a arăta loader-ul și a ascunde UI-ul
const showLoader = () => {
  document.querySelector('.loader').style.display = 'block';
  document.querySelector('.cat-info').style.display = 'none';
  document.querySelector('.error').style.display = 'none';
};

// Funcție pentru a ascunde loader-ul și a arăta informațiile despre pisică
const hideLoaderAndDisplayCatInfo = (catData) => {
  document.querySelector('.loader').style.display = 'none';
  document.querySelector('.cat-info').style.display = 'block';

  const catImage = document.getElementById('cat-image');
  const catName = document.getElementById('cat-name');
  const catDescription = document.getElementById('cat-description');
  const catTemperament = document.getElementById('cat-temperament');

  catImage.src = catData[0].url;
  catName.textContent = catData[0].breeds[0].name;
  catDescription.textContent = catData[0].breeds[0].description;
  catTemperament.textContent = `Temperament: ${catData[0].breeds[0].temperament}`;
};

// Funcție pentru a trata eroarea
const handleError = (message) => {
  document.querySelector('.loader').style.display = 'none';
  document.querySelector('.error').style.display = 'block';
  document.querySelector('.error').textContent = message;
};

// Inițializarea aplicației
const init = async () => {
  try {
    showLoader();
    // Obține datele despre rase
    const breeds = await fetchBreeds();
    populateBreedSelect(breeds);

    // Adaugă event listener pentru selectarea unei rase
    document.getElementById('breed-select').addEventListener('change', async (event) => {
      const breedId = event.target.value;
      if (breedId) {
        showLoader();
        try {
          const catData = await fetchCatByBreed(breedId);
          hideLoaderAndDisplayCatInfo(catData);
        } catch (error) {
          handleError(error.message);
        }
      }
    });
  } catch (error) {
    handleError(error.message);
  }
};

// Rulează aplicația la încărcarea paginii
window.onload = init;
