import axios from 'axios';
const URL = 'https://pixabay.com/api/';
const KEY = '38622726-1d1c6ccd64174273156cb8786';

export async function searchPhoto(search, page, perPage) {
  const url = `${URL}?key=${KEY}&q=${search}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
  const response = await axios.get(url);
  return response.data;
}
