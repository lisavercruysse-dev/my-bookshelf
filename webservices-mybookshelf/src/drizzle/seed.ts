import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';
import * as argon2 from 'argon2';
import { Role } from '../auth/roles';

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 5,
});

const db = drizzle(connection, {
  schema,
  mode: 'default',
});

async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    hashLength: 32,
    timeCost: 2,
    memoryCost: 2 ** 16,
  });
}

async function resetDatabase() {
  console.log('Resetting database...');

  console.log('Deleting existing data...');

  await db.delete(schema.shelfBooks);
  await db.delete(schema.userBooks);
  await db.delete(schema.reviews);
  await db.delete(schema.shelves);
  await db.delete(schema.books);
  await db.delete(schema.users);

  console.log('Existing data deleted.');

  console.log('Resetting AUTO_INCREMENT counters...');

  await db.execute(`ALTER TABLE reviews AUTO_INCREMENT = 1`);
  await db.execute(`ALTER TABLE users AUTO_INCREMENT = 1`);
  await db.execute(`ALTER TABLE shelves AUTO_INCREMENT = 1`);

  console.log('AUTO_INCREMENT counters reset.');

  console.log('Database reset complete.');
}

async function seedBooks() {
  console.log('Seeding books...');

  await db.insert(schema.books).values([
    {
      isbn: '9780435123437',
      title: 'Flowers for Algernon',
      genre: 'Science Fiction',
      description:
        'A novella about a man with low IQ who undergoes an experimental surgery to increase his intelligence.',
      pageCount: 218,
      author: 'Daniel Keyes',
    },
    {
      isbn: '9781781103142',
      title: "Harry Potter and the Philosopher's Stone",
      genre: 'Fantasy',
      description:
        'Young wizard Harry discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.',
      pageCount: 336,
      author: 'J.K. Rowling',
    },
    {
      isbn: '0721438935188',
      title: 'Beautiful Test',
      genre: 'Test Fiction',
      description: 'This is a test book for testing purposes.',
      pageCount: 20,
      author: 'Suzanne Collins',
    },
    {
      isbn: '0123438455178',
      title: 'Another Test Test',
      genre: 'Test Fiction',
      description: 'Another short test book.',
      pageCount: 4,
      author: 'Test Person',
    },
    {
      isbn: '9780140449136',
      title: 'The Odyssey',
      genre: 'Epic Poetry',
      description:
        "Homer's classic tale of Odysseus and his journey home from the Trojan War.",
      pageCount: 560,
      author: 'Homer',
    },
  ]);

  console.log('Book seed data inserted successfully.');
}

async function seedUsers() {
  console.log('Seeding users...');

  await db.insert(schema.users).values([
    {
      userName: 'Alice',
      email: 'alice@example.com',
      passwordHash: await hashPassword('12345678'),
      roles: [Role.ADMIN, Role.USER],
    },
    {
      userName: 'Bob',
      email: 'bob@example.com',
      passwordHash: await hashPassword('12345678'),
      roles: [Role.USER],
    },
    {
      userName: 'Charlie',
      email: 'charlie@example.com',
      passwordHash: await hashPassword('12345678'),
      roles: [Role.ADMIN, Role.USER],
    },
    {
      userName: 'Diana',
      email: 'diana@example.com',
      passwordHash: await hashPassword('12345678'),
      roles: [Role.USER],
    },
    {
      userName: 'Eve',
      email: 'eve@example.com',
      passwordHash: await hashPassword('12345678'),
      roles: [Role.ADMIN, Role.USER],
    },
    {
      userName: 'Frank',
      email: 'frank@example.com',
      passwordHash: await hashPassword('12345678'),
      roles: [Role.USER],
    },
  ]);

  console.log('User seed data inserted successfully.');
}

async function seedReviews() {
  console.log('Seeding reviews...');

  await db.insert(schema.reviews).values([
    {
      isbn: '9780435123437', // Flowers for Algernon
      userId: 2,
      body: '{"type":"doc","content":[{"type":"heading","attrs":{"level":5},"content":[{"type":"text","text":"I hope this works"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"I spent way too much time on this."}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Like "},{"type":"text","marks":[{"type":"bold"},{"type":"italic"}],"text":"way "},{"type":"text","marks":[{"type":"italic"}],"text":"too much."}]},{"type":"paragraph"}]}',
      stars: 5,
      date: new Date('2023-01-15'),
      title: 'Absolute must-read',
      recommended: true,
    },
    {
      isbn: '9780435123437',
      userId: 2,
      body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"The transformation of the protagonist is fascinating and sad."}]}]}',
      stars: 4,
      date: new Date('2023-02-10'),
      title: 'Loved this!',
      recommended: true,
    },
    {
      isbn: '9781781103142', // Harry Potter
      userId: 2,
      body: '{"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Magical Adventures"}]},{"type":"paragraph","content":[{"type":"text","text":"Loved the magical world and the characters."}]},{"type":"paragraph","content":[{"type":"text","text":"A must-read for all ages."}]}]}',
      stars: 5,
      date: new Date('2023-03-05'),
      title: 'Going on my favorites',
      recommended: true,
    },
    {
      isbn: '0721438935188', // Beautiful Test
      userId: 4,
      body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Short but entertaining."}]},{"type":"paragraph","content":[{"type":"text","text":"Good for a test run."}]}]}',
      stars: 3,
      date: new Date('2023-04-20'),
      title: 'Expected better, but still fun',
      recommended: false,
    },
    {
      isbn: '0123438455178', // Another Test Test
      userId: 5,
      body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Very short book,"}]},{"type":"paragraph","content":[{"type":"text","text":"but surprisingly enjoyable!"}]}]}',
      stars: 4,
      date: new Date('2023-05-10'),
      title: 'Aaaah! so good!',
      recommended: true,
    },
    {
      isbn: '9780140449136', // The Odyssey
      userId: 6,
      body: '{"type":"doc","content":[{"type":"heading","attrs":{"level":4},"content":[{"type":"text","text":"Epic Journey"}]},{"type":"paragraph","content":[{"type":"text","text":"Homer’s masterpiece."}]},{"type":"paragraph","content":[{"type":"text","text":"Timeless classic."}]}]}',
      stars: 5,
      date: new Date('2023-06-01'),
      title: 'GREAT',
      recommended: true,
    },
  ]);

  console.log('Review seed data inserted successfully.');
}

async function seedUserBooks() {
  console.log('Seeding user_books...');

  await db.insert(schema.userBooks).values([
    {
      userId: 1,
      isbn: '9780435123437', // Flowers for Algernon
      pagesRead: 50,
      dateStarted: new Date('2025-01-01'),
      dateEnded: null,
    },
    {
      userId: 2,
      isbn: '9781781103142', // Harry Potter
      pagesRead: 336,
      dateStarted: new Date('2024-12-01'),
      dateEnded: new Date('2024-12-20'),
    },
    {
      userId: 3,
      isbn: '0721438935188', // Beautiful Test
      pagesRead: 20,
      dateStarted: new Date('2025-02-15'),
      dateEnded: new Date('2025-02-16'),
    },
    {
      userId: 4,
      isbn: '0123438455178', // Another Test Test
      pagesRead: 2,
      dateStarted: new Date('2025-03-10'),
      dateEnded: null,
    },
    {
      userId: 5,
      isbn: '9780140449136', // The Odyssey
      pagesRead: 300,
      dateStarted: new Date('2025-01-20'),
      dateEnded: null,
    },
  ]);

  console.log('user_books seed data inserted successfully.');
}

async function seedShelves() {
  console.log('Seeding shelves...');

  await db.insert(schema.shelves).values([
    {
      title: 'Favorites',
      userId: 1,
      canDelete: false,
      description: 'A shelf to keep track of all your favorite books',
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Want to Read',
      userId: 1,
      canDelete: false,
      description: 'A shelf to keep track of all the books you want to read',
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Finished',
      userId: 1,
      canDelete: false,
      description: 'A shelf to keep track of all the books you have read',
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Current Reads',
      userId: 1,
      canDelete: false,
      description:
        'A shelf to keep track of all the books you are currently reading',
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Favorites',
      userId: 2,
      canDelete: false,
      description: 'A shelf to keep track of all your favorite books',
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Want to Read',
      userId: 2,
      canDelete: false,
      description: 'A shelf to keep track of all the books you want to read',
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Current Reads',
      userId: 2,
      canDelete: false,
      description:
        'A shelf to keep track of all the books you are currently reading',
      dateAdded: new Date('2026-08-09'),
    },
    {
      title: 'Finished',
      userId: 2,
      canDelete: false,
      description: 'A shelf to keep track of all the books you have read',
      dateAdded: new Date('2026-08-09'),
    },
  ]);

  console.log('Shelves seed data inserted successfully.');
}

async function seedShelfBooks() {
  console.log('Seeding shelfBooks...');

  await db.insert(schema.shelfBooks).values([
    { shelfId: 1, isbn: '9780435123437' },
    { shelfId: 1, isbn: '9780140449136' },
    { shelfId: 2, isbn: '9781781103142' },
    { shelfId: 3, isbn: '0721438935188' },
  ]);

  console.log('shelfBooks seed data inserted successfully.');
}

async function main() {
  console.log('Starting database seed...\n');

  await resetDatabase();
  await seedBooks();
  await seedUsers();
  await seedReviews();
  await seedUserBooks();
  await seedShelves();
  await seedShelfBooks();

  console.log('Database seeding completed successfully.');
}

main()
  .then(async () => {
    await connection.end();
  })
  .catch(async (e) => {
    console.error(e);
    await connection.end();
    process.exit(1);
  });
