import axios from 'axios';

const fetchImages = async (query, page, perPage) => {
  const apiKey = '35143561-a246dd3ff16ac48132d2e40aa';
  const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
};

export default fetchImages;
