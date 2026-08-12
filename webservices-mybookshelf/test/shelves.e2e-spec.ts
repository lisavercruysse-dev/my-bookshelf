// test/shelves.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import request from 'supertest';
import { createTestApp } from './helpers/create-app';
import { clearShelves, seedShelves, SHELVES_SEED } from './seeds/shelves';
import { clearUsers, seedUsers } from './seeds/users';
import { login } from './helpers/login';
import testAuthHeader from '../test/helpers/testAuthHeader';
import { clearBooks } from './seeds/books';

describe('Shelves', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;

  const url = '/api/shelves';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedUsers(app, drizzle);
    await seedShelves(drizzle);

    userAuthToken = await login(app);
  });

  afterAll(async () => {
    await clearBooks(drizzle);
    await clearShelves(drizzle);
    await clearUsers(drizzle);
    await app.close();
  });

  describe('GET /api/shelves', () => {
    it('should 200 and return all shelves for the logged in user', async () => {
      const response = await request(app.getHttpServer())
        .get(url)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.items).toEqual(
        expect.arrayContaining(
          SHELVES_SEED.map((shelf) =>
            expect.objectContaining({
              title: shelf.title,
              userId: shelf.userId,
              canDelete: shelf.canDelete,
            }),
          ),
        ),
      );
    });

    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  describe('GET /api/shelves/finished', () => {
    it("should 200 and return the user's Finished shelf", async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/finished`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          title: 'Finished',
          userId: 1,
        }),
      );
      expect(response.body.books).toEqual([]);
    });

    testAuthHeader(() => request(app.getHttpServer()).get(`${url}/finished`));
  });

  describe('POST /api/shelves', () => {
    it('should 201 and return the created shelf', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          title: 'My custom shelf',
          description: 'A shelf created during tests',
        })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: 'My custom shelf',
          description: 'A shelf created during tests',
          userId: 1,
          canDelete: true,
        }),
      );
    });

    it('should 400 when missing title', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({ description: 'No title given' })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
    });

    it('should 400 when missing description', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({ title: 'No description given' })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
    });

    testAuthHeader(() =>
      request(app.getHttpServer())
        .post(url)
        .send({ title: 'Shelf', description: 'Desc' }),
    );
  });

  describe('PUT /api/shelves/:shelfId', () => {
    let editableShelfId: number;

    beforeAll(async () => {
      const createResponse = await request(app.getHttpServer())
        .post(url)
        .send({ title: 'Editable shelf', description: 'Before edit' })
        .auth(userAuthToken, { type: 'bearer' });

      editableShelfId = createResponse.body.id;
    });

    it('should 200 and update the shelf', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/${editableShelfId}`)
        .send({ title: 'Renamed shelf', description: 'After edit' })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
    });

    it('should 403 when editing a default shelf', async () => {
      // find one of the seeded default shelves for this user
      const shelvesResponse = await request(app.getHttpServer())
        .get(url)
        .auth(userAuthToken, { type: 'bearer' });

      const defaultShelf = shelvesResponse.body.items.find(
        (shelf: { canDelete: boolean }) => shelf.canDelete === false,
      );

      const response = await request(app.getHttpServer())
        .put(`${url}/${defaultShelf.id}`)
        .send({ title: 'Trying to rename', description: 'Should fail' })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(403);
    });

    it('should 404 for a non-existing shelf', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/999999`)
        .send({ title: 'Ghost shelf', description: 'Does not exist' })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer())
        .put(`${url}/1`)
        .send({ title: 'X', description: 'Y' }),
    );
  });

  describe('DELETE /api/shelves/:shelfId', () => {
    it('should 200 and delete a custom shelf', async () => {
      const createResponse = await request(app.getHttpServer())
        .post(url)
        .send({ title: 'Shelf to delete', description: 'Temporary' })
        .auth(userAuthToken, { type: 'bearer' });

      const shelfId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .delete(`${url}/${shelfId}`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
    });

    it('should 403 when deleting a default shelf', async () => {
      const shelvesResponse = await request(app.getHttpServer())
        .get(url)
        .auth(userAuthToken, { type: 'bearer' });

      const defaultShelf = shelvesResponse.body.items.find(
        (shelf: { canDelete: boolean }) => shelf.canDelete === false,
      );

      const response = await request(app.getHttpServer())
        .delete(`${url}/${defaultShelf.id}`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(403);
    });

    it('should 404 for a non-existing shelf', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/999999`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
    });

    testAuthHeader(() => request(app.getHttpServer()).delete(`${url}/1`));
  });

  describe('GET /api/shelves/:shelfId/books', () => {
    it('should 200 and return the books on a shelf (empty for a fresh shelf)', async () => {
      const createResponse = await request(app.getHttpServer())
        .post(url)
        .send({ title: 'Empty shelf', description: 'No books yet' })
        .auth(userAuthToken, { type: 'bearer' });

      const shelfId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .get(`${url}/${shelfId}/books`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.items).toEqual([]);
    });

    it('should 404 for a non-existing shelf', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/999999/books`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
    });

    testAuthHeader(() => request(app.getHttpServer()).get(`${url}/1/books`));
  });

  describe('POST /api/shelves/:shelfId/books/:isbn', () => {
    const newBookIsbn = '9781444775827';

    const newBookData = {
      isbn: newBookIsbn,
      title: 'A man called Ove',
      genre: 'Literary fiction',
      pageCount: 337,
      author: 'Fredrik Backman',
      description: 'Ove is a grumpy old man who lost his wife.',
      imageLink: null,
    };

    it('should 201 and add a new book to the shelf, creating it first', async () => {
      const createResponse = await request(app.getHttpServer())
        .post(url)
        .send({ title: 'Book shelf', description: 'For adding books' })
        .auth(userAuthToken, { type: 'bearer' });
      const shelfId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .post(`${url}/${shelfId}/books/${newBookIsbn}`)
        .send(newBookData)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          isbn: newBookIsbn,
          title: 'A man called Ove',
          author: 'Fredrik Backman',
        }),
      );
    });

    it('should 201 and add an already-existing book (bookData still required)', async () => {
      const createResponse = await request(app.getHttpServer())
        .post(url)
        .send({
          title: 'Second shelf',
          description: 'Reusing an existing book',
        })
        .auth(userAuthToken, { type: 'bearer' });
      const shelfId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .post(`${url}/${shelfId}/books/${newBookIsbn}`)
        .send(newBookData)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(201);
      expect(response.body.isbn).toBe(newBookIsbn);
    });

    it('should 400 when no book data is sent, even for a new isbn', async () => {
      const createResponse = await request(app.getHttpServer())
        .post(url)
        .send({ title: 'Empty-body shelf', description: 'No book data sent' })
        .auth(userAuthToken, { type: 'bearer' });
      const shelfId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .post(`${url}/${shelfId}/books/0000000000000`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
    });

    it('should 404 for a non-existing shelf', async () => {
      const response = await request(app.getHttpServer())
        .post(`${url}/999999/books/${newBookIsbn}`)
        .send(newBookData)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/shelves/:shelfId/books/:isbn', () => {
    const bookIsbn = '9781444775827';

    it('should 200 and remove a book from the shelf', async () => {
      const createResponse = await request(app.getHttpServer())
        .post(url)
        .send({ title: 'Shelf to remove book from', description: 'Temp' })
        .auth(userAuthToken, { type: 'bearer' });
      const shelfId = createResponse.body.id;

      await request(app.getHttpServer())
        .post(`${url}/${shelfId}/books/${bookIsbn}`)
        .auth(userAuthToken, { type: 'bearer' });

      const response = await request(app.getHttpServer())
        .delete(`${url}/${shelfId}/books/${bookIsbn}`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
    });

    it('should 404 for a non-existing shelf', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/999999/books/${bookIsbn}`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
    });

    it('should 404 for a non-existing isbn', async () => {
      const createResponse = await request(app.getHttpServer())
        .post(url)
        .send({ title: 'Another shelf', description: 'Temp' })
        .auth(userAuthToken, { type: 'bearer' });
      const shelfId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .delete(`${url}/${shelfId}/books/0000000000000`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).delete(`${url}/1/books/${bookIsbn}`),
    );
  });
});
