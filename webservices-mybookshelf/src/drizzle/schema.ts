import { int, mysqlTable, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

export const books = mysqlTable(
  'books',
  {
    isbn: varchar('isbn', { length: 13 }).primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    genre: varchar('genre', { length: 100 }).notNull(),
    description: varchar('description', { length: 1000 }).notNull(),
    amountPages: int('amountPages', { unsigned: true }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
  },
  (table) => [uniqueIndex('idx_isbn').on(table.isbn)],
);
