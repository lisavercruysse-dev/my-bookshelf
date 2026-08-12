import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { shelves } from '../../src/drizzle/schema';

export const SHELVES_SEED = [
  {
    title: 'Favorites',
    userId: 1,
    canDelete: false,
    dateAdded: new Date('2026-08-09'),
  },
  {
    title: 'Want to Read',
    userId: 1,
    canDelete: false,
    dateAdded: new Date('2026-08-09'),
  },
  {
    title: 'Finished',
    userId: 1,
    canDelete: false,
    dateAdded: new Date('2026-08-09'),
  },
  {
    title: 'Current Reads',
    userId: 1,
    canDelete: false,
    dateAdded: new Date('2026-08-09'),
  },
];

export async function seedShelves(drizzle: DatabaseProvider) {
  await drizzle.insert(shelves).values(SHELVES_SEED);
}

export async function clearShelves(drizzle: DatabaseProvider) {
  await drizzle.delete(shelves);
}
