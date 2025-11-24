import {
  int,
  mysqlTable,
  smallint,
  uniqueIndex,
  varchar,
  date,
  primaryKey,
  boolean,
} from 'drizzle-orm/mysql-core';

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

export const reviews = mysqlTable(
  'reviews',
  {
    id: int('id', { unsigned: true }).primaryKey().autoincrement(),
    isbn: varchar('isbn', { length: 13 }).notNull(),
    userId: int('userId', { unsigned: true }).notNull(),
    body: varchar('body', { length: 1000 }).notNull(),
    stars: smallint('stars', { unsigned: true }).notNull(),
    date: date('date').notNull(),
    title: varchar('title', { length: 255 }).notNull(),
  },
  (table) => [uniqueIndex('idx_id').on(table.id)],
);

export const users = mysqlTable('users', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  userName: varchar('userName', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
});

export const userBooks = mysqlTable(
  'user_books',
  {
    isbn: varchar('isbn', { length: 13 }).notNull(),
    userId: int('userId', { unsigned: true }).notNull(),
    pagesRead: int('pagesRead', { unsigned: true }).notNull(),
    status: varchar('status', { length: 50 }).notNull(),
    favorite: boolean('favorite').notNull().default(false),
    dateStarted: date('dateStarted'),
    dateFinished: date('dateFinished'),
  },
  (table) => [primaryKey({ columns: [table.isbn, table.userId] })],
);
