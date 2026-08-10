import { relations } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  smallint,
  uniqueIndex,
  varchar,
  date,
  text,
  json,
  primaryKey,
  boolean,
} from 'drizzle-orm/mysql-core';

export const books = mysqlTable(
  'books',
  {
    isbn: varchar('isbn', { length: 20 }).primaryKey(),
    title: varchar('title', { length: 100 }).notNull(),
    genre: varchar('genre', { length: 100 }).notNull(),
    description: text('description').notNull(),
    pageCount: int('pageCount', { unsigned: true }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    imageLink: varchar('imageLink', { length: 255 }),
  },
  (table) => [uniqueIndex('idx_isbn').on(table.isbn)],
);

export const users = mysqlTable(
  'users',
  {
    id: int('id', { unsigned: true }).primaryKey().autoincrement(),
    userName: varchar('userName', { length: 50 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    passwordHash: varchar('passwordHash', { length: 255 }).notNull(),
    roles: json('roles').notNull(),
  },
  (table) => [uniqueIndex('idx_user_email_unique').on(table.email)],
);

export const reviews = mysqlTable(
  'reviews',
  {
    id: int('id', { unsigned: true }).primaryKey().autoincrement(),
    isbn: varchar('isbn', { length: 13 })
      .notNull()
      .references(() => books.isbn, { onDelete: 'cascade' }),
    userId: int('userId', { unsigned: true })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    body: text('body'),
    stars: smallint('stars', { unsigned: true }).notNull(),
    date: date('date').notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    recommended: boolean('recommended').notNull(),
  },
  (table) => [uniqueIndex('idx_id').on(table.id)],
);

export const shelves = mysqlTable('shelves', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  userId: int('userId', { unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  canDelete: boolean('canDelete').notNull().default(true),
  dateAdded: date('dateAdded'),
  description: text('description'),
});

export const shelfBooks = mysqlTable(
  'shelfBooks',
  {
    shelfId: int('id', { unsigned: true })
      .notNull()
      .references(() => shelves.id, { onDelete: 'cascade' }),
    isbn: varchar('isbn', { length: 13 })
      .notNull()
      .references(() => books.isbn, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.shelfId, table.isbn] })],
);

//Relations
export const bookRelations = relations(books, ({ many }) => ({
  reviews: many(reviews),
  shelves: many(shelves),
}));

export const reviewRelations = relations(reviews, ({ one }) => ({
  book: one(books, {
    fields: [reviews.isbn],
    references: [books.isbn],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  reviews: many(reviews),
  shelves: many(shelves),
}));

export const shelfRelations = relations(shelves, ({ many, one }) => ({
  shelfBooks: many(shelfBooks),
  user: one(users, {
    fields: [shelves.userId],
    references: [users.id],
  }),
}));

export const shelfBookRelations = relations(shelfBooks, ({ one }) => ({
  shelf: one(shelves, {
    fields: [shelfBooks.shelfId],
    references: [shelves.id],
  }),
  book: one(books, {
    fields: [shelfBooks.isbn],
    references: [books.isbn],
  }),
}));
