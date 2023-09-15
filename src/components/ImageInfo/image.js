const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38622726-1d1c6ccd64174273156cb8786';

export const searchPhoto = (searchValue, page) => {
  return fetch(
    `${BASE_URL}?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
