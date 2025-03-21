import axios from 'axios';

// Setează cheia API globală pentru toate cererile
axios.defaults.headers.common['x-api-key'] = 'live_PrslwJBIX95QwX5OVqvtdjX4W8IHHNeCPqppHKTyCpFBqHTwZvPU7qe2XC4IKDjy';

// Funcție pentru a obține rasele de pisici
export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data; // Returnează array-ul cu rase
  } catch (error) {
    throw new Error('Eroare la obținerea raselor: ' + error.message);
  }
};

// Funcție pentru a obține informații despre o pisică pe baza ID-ului rasei
export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data; // Returnează informațiile despre pisică
  } catch (error) {
    throw new Error('Eroare la obținerea informațiilor despre pisică: ' + error.message);
  }
};
