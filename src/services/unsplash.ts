import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';

export const getRandomFashionImage = async () => {
  try {
    const response = await axios.get(`${UNSPLASH_API_URL}/photos/random`, {
      params: {
        query: 'fashion editorial',
        orientation: 'landscape',
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return null;
  }
}; 