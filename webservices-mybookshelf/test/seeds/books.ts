import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { books } from '../../src/drizzle/schema';

export const BOOKS_SEED = [
  {
    isbn: '9781444775827',
    title: 'A man called Ove',
    genre: 'Literary fiction',
    pageCount: 337,
    author: 'Fredrik Backman',
    description: 'Ove is a grumpy old man who lost his wife.',
    imageLink: null,
  },
];

export async function seedBooks(drizzle: DatabaseProvider) {
  await drizzle.insert(books).values(BOOKS_SEED);
}

export async function clearBooks(drizzle: DatabaseProvider) {
  await drizzle.delete(books);
}
