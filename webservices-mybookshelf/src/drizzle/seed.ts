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
  await db.delete(schema.books);
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
    },
    {
      isbn: '9781781103142',
      title: "Harry Potter and the Philosopher's Stone",
      genre: 'Fantasy',
      description:
        'Young wizard Harry discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.',
      amountPages: 336,
      author: 'J.K. Rowling',
    },
    {
      isbn: '0721438935188',
      title: 'Beautiful Test',
      genre: 'Test Fiction',
      description: 'This is a test book for testing purposes.',
      amountPages: 20,
      author: 'Suzanne Collins',
    },
    {
      isbn: '0123438455178',
      title: 'Another Test Test',
      genre: 'Test Fiction',
      description: 'Another short test book.',
      amountPages: 4,
      author: 'Test Person',
    },
    {
      isbn: '9780140449136',
      title: 'The Odyssey',
      genre: 'Epic Poetry',
      description:
        "Homer's classic tale of Odysseus and his journey home from the Trojan War.",
      amountPages: 560,
      author: 'Homer',
    },
  ]);

  console.log('Seed data inserted successfully.');
}

async function main() {
  console.log('Starting database seed...\n');

  await resetDatabase();
  await seedBooks();

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
