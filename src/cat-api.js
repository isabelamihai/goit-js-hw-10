import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_PrslwJBIX95QwX5OVqvtdjX4W8IHHNeCPqppHKTyCpFBqHTwZvPU7qe2XC4IKDjy'; // Asigură-te că pui cheia corectă aici

// Funcția care obține lista raselor de pisici
export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data; // Returnează datele despre rase
  } catch (error) {
    console.error('Eroare la încărcarea raselor:', error);
    throw error;
  }
};

// Funcția care obține informații despre o pisică pe baza rasei
export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data; // Returnează datele despre pisică
  } catch (error) {
    console.error('Eroare la încărcarea pisicii:', error);
    throw error;
  }
};

