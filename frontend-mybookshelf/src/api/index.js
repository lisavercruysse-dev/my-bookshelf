import axios from 'axios';

const baseUrl = import.meta.env.VITE_GOOGLE_BOOKS_API_URL;
const googleBooksKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export async function getBookTest(url){
  const { data } = await axios.get(`${baseUrl}/volumes${url}&key=${googleBooksKey}`);

  return data.items;
}