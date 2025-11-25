import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 5,
});

const db = drizzle(connection, {
  schema,
  mode: 'default',
});

async function resetDatabase() {
  console.log('Resetting database...');

  console.log('Deleting existing data...');

  await db.delete(schema.books);
  await db.delete(schema.reviews);
  await db.delete(schema.users);

  console.log('Existing data deleted.');

  console.log('Resetting AUTO_INCREMENT counters...');

  await db.execute(`ALTER TABLE books AUTO_INCREMENT = 1`);
  await db.execute(`ALTER TABLE reviews AUTO_INCREMENT = 1`);
  await db.execute(`ALTER TABLE users AUTO_INCREMENT = 1`);

  console.log('AUTO_INCREMENT counters reset.');

  console.log('database reset complete.');
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
      amountPages: 218,
      author: 'Daniel Keyes',
      favoriteCount: 200,
    },
    {
      isbn: '9781781103142',
      title: "Harry Potter and the Philosopher's Stone",
      genre: 'Fantasy',
      description:
        'Young wizard Harry discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.',
      amountPages: 336,
      author: 'J.K. Rowling',
      favoriteCount: 20,
    },
    {
      isbn: '0721438935188',
      title: 'Beautiful Test',
      genre: 'Test Fiction',
      description: 'This is a test book for testing purposes.',
      amountPages: 20,
      author: 'Suzanne Collins',
      favoriteCount: 600,
    },
    {
      isbn: '0123438455178',
      title: 'Another Test Test',
      genre: 'Test Fiction',
      description: 'Another short test book.',
      amountPages: 4,
      author: 'Test Person',
      favoriteCount: 3,
    },
    {
      isbn: '9780140449136',
      title: 'The Odyssey',
      genre: 'Epic Poetry',
      description:
        "Homer's classic tale of Odysseus and his journey home from the Trojan War.",
      amountPages: 560,
      author: 'Homer',
      favoriteCount: 15,
    },
  ]);

  console.log('Book seed data inserted successfully.');
}

async function seedReviews() {
  console.log('Seeding reviews...');

  await db.insert(schema.reviews).values([
    {
      isbn: '9780435123437', // Flowers for Algernon
      userId: 1,
      title: 'A moving story',
      body: 'I really enjoyed how the book explores human intelligence and emotion.',
      stars: 5,
      date: new Date('2023-01-15'),
    },
    {
      isbn: '9780435123437',
      userId: 2,
      title: 'Thought-provoking',
      body: 'The transformation of the protagonist is both fascinating and sad.',
      stars: 4,
      date: new Date('2023-02-10'),
    },
    {
      isbn: '9781781103142', // Harry Potter
      userId: 3,
      title: 'Magical and fun!',
      body: 'Loved the magical world and the characters. A must-read for all ages.',
      stars: 5,
      date: new Date('2023-03-05'),
    },
    {
      isbn: '0721438935188', // Beautiful Test
      userId: 4,
      title: 'Quick read',
      body: 'Short but entertaining. Good for a test run.',
      stars: 3,
      date: new Date('2023-04-20'),
    },
    {
      isbn: '0123438455178', // Another Test Test
      userId: 5,
      title: 'Mini story',
      body: 'Very short book, but surprisingly enjoyable!',
      stars: 4,
      date: new Date('2023-05-10'),
    },
    {
      isbn: '9780140449136', // The Odyssey
      userId: 6,
      title: 'Epic journey',
      body: 'Homer’s masterpiece. Timeless classic.',
      stars: 5,
      date: new Date('2023-06-01'),
    },
  ]);

  console.log('Review seed data inserted successfully.');
}

async function seedUsers() {
  console.log('Seeding users...');

  await db.insert(schema.users).values([
    {
      userName: 'Alice',
      email: 'alice@example.com',
    },
    {
      userName: 'Bob',
      email: 'bob@example.com',
    },
    {
      userName: 'Charlie',
      email: 'charlie@example.com',
    },
    {
      userName: 'Diana',
      email: 'diana@example.com',
    },
    {
      userName: 'Eve',
      email: 'eve@example.com',
    },
    {
      userName: 'Frank',
      email: 'frank@example.com',
    },
  ]);

  console.log('User seed data inserted successfully.');
}

async function main() {
  console.log('Starting database seed...\n');

  await resetDatabase();
  await seedBooks();
  await seedUsers();
  await seedReviews();

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
