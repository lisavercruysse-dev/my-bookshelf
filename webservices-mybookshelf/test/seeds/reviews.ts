import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { reviews } from '../../src/drizzle/schema';

export const REVIEWS_SEED = [
  {
    id: 1,
    isbn: '9781444775827',
    userId: 1,
    body: 'A beautifully written story about grief and connection.',
    stars: 5,
    date: new Date('2026-08-01'),
    recommended: true,
    title: 'A must-read',
  },
];

export async function seedReviews(drizzle: DatabaseProvider) {
  await drizzle.insert(reviews).values(REVIEWS_SEED);
}

export async function clearReviews(drizzle: DatabaseProvider) {
  await drizzle.delete(reviews);
}
