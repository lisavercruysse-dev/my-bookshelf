import axios from 'axios';

const baseUrl = import.meta.env.VITE_GOOGLE_BOOKS_API_URL;
const googleBooksKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export async function getBooks(url){
  const { data } = await axios.get(`${baseUrl}/volumes${url}&key=${googleBooksKey}`);
  return data.items;
}

export async function getBooksById(isbn) {
  const { data } = await axios.get(
    `${baseUrl}/volumes?q=isbn:${isbn}&key=${googleBooksKey}`,
  );
  if (!data.items || data.items.length === 0) {
    return null;
  }
  return data.items[0].volumeInfo;
}
