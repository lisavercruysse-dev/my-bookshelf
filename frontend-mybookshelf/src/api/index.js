import axiosRoot from 'axios';
import { JWT_TOKEN_KEY } from '../contexts/auth';

const googleBooksBaseUrl = import.meta.env.VITE_GOOGLE_BOOKS_API_URL;
const googleBooksKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
const baseUrl = import.meta.env.VITE_PERSONAL_API_URL;
;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export async function getData(url) {
  const {data} = await axios.get(`${baseUrl}/${url}`);
  return data.items;
}

export async function save(url, { arg: {id, ...data} }) {
  const {data: result} = await axios({
    method: id ? 'PUT' : 'POST',
    url: `${baseUrl}/${url}/${id ?? ''}`,
    data,
  });
  return result;
}

export async function saveToShelf(url, { arg: values }) {
  const { isbn, bookData, existingShelf, newShelf } = values;

  await axios({
    method: 'POST',
    url: `${baseUrl}/books`,
    data: { isbn, ...bookData },
  });

  let shelfId = existingShelf;
  if (newShelf) {
    const shelf = await save('shelves', { arg: { title: newShelf } });
    shelfId = shelf.id;
  }

  await axios({
    method: 'POST',
    url: `${baseUrl}/shelves/${shelfId}/books/${isbn}`,
  });
}

export async function saveUserBook(url, {arg: {userId, isbn, ...data}}){
  await axios.post(`${baseUrl}/${url}`, { userId, isbn, ...data });
}
export async function updateUserBook(url, { arg: { ...data } }) {
  await axios.put(`${baseUrl}/${url}`, data);
}

export async function getById(url) {
  const { data } = await axios.get(`${baseUrl}/${url}`);
  return data;
}

export async function deleteById (url, {arg: id}) {
  await axios.delete(`${baseUrl}/${url}/${id}`);
}

export async function post(url, {arg}) {
  const {data} = await axios.post(`${baseUrl}/${url}`, arg);
  return data;
}

//Google Books
export async function getBooks(url) {
  const { data } = await axiosRoot.get(
    `${googleBooksBaseUrl}/volumes${url}&key=${googleBooksKey}`,
  );
  return data.items;
}

export async function getBookById(isbn) {
  const { data } = await axiosRoot.get(
    `${googleBooksBaseUrl}/volumes?q=isbn:${isbn}&key=${googleBooksKey}`,
  );
  if (!data.items?.length) return null;
  return data.items[0];
}