import { INestApplication } from '@nestjs/common';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import request from 'supertest';
import { createTestApp } from './helpers/create-app';
import { clearBooks, seedBooks, BOOKS_SEED } from './seeds/books';
import { clearReviews, seedReviews, REVIEWS_SEED } from './seeds/reviews';
import { clearUsers, seedUsers } from './seeds/users';
import { login } from './helpers/login';
import testAuthHeader from './helpers/testAuthHeader';

describe('Reviews', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;

  const url = '/api/reviews';
  const seededIsbn = BOOKS_SEED[0].isbn;

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedUsers(app, drizzle);
    await seedBooks(drizzle);
    await seedReviews(drizzle);

    userAuthToken = await login(app);
  });

  afterAll(async () => {
    await clearReviews(drizzle);
    await clearBooks(drizzle);
    await clearUsers(drizzle);
    await app.close();
  });

  describe('GET /api/reviews', () => {
    it("should 200 and return the logged in user's reviews", async () => {
      const response = await request(app.getHttpServer())
        .get(url)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.items).toEqual(
        expect.arrayContaining(
          REVIEWS_SEED.filter((r) => r.userId === 1).map((review) =>
            expect.objectContaining({
              id: review.id,
              isbn: review.isbn,
              title: review.title,
              stars: review.stars,
            }),
          ),
        ),
      );
    });

    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  describe('GET /api/reviews/:isbn', () => {
    it('should 200 and return all reviews for a book', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/${seededIsbn}`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.items).toEqual(
        expect.arrayContaining(
          REVIEWS_SEED.filter((r) => r.isbn === seededIsbn).map((review) =>
            expect.objectContaining({
              id: review.id,
              title: review.title,
            }),
          ),
        ),
      );
    });

    it('should 404 for an isbn with no reviews', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/0000000000000`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).get(`${url}/${seededIsbn}`),
    );
  });

  describe('POST /api/reviews/:isbn', () => {
    it('should 201 and create a new review', async () => {
      const response = await request(app.getHttpServer())
        .post(`${url}/${seededIsbn}`)
        .send({
          body: 'Loved every page.',
          stars: 4,
          title: 'Great book',
          recommended: true,
        })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          isbn: seededIsbn,
          userId: 1,
          title: 'Great book',
          stars: 4,
          recommended: true,
        }),
      );
    });

    it('should 400 when missing title', async () => {
      const response = await request(app.getHttpServer())
        .post(`${url}/${seededIsbn}`)
        .send({ body: 'No title', stars: 3, recommended: true })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
    });

    it('should 400 when stars is below 1', async () => {
      const response = await request(app.getHttpServer())
        .post(`${url}/${seededIsbn}`)
        .send({
          body: 'Bad rating',
          stars: 0,
          title: 'Invalid stars',
          recommended: false,
        })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
    });

    it('should 400 when stars is above 5', async () => {
      const response = await request(app.getHttpServer())
        .post(`${url}/${seededIsbn}`)
        .send({
          body: 'Too many stars',
          stars: 6,
          title: 'Invalid stars',
          recommended: false,
        })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
    });

    it('should 404 for a non-existing book isbn', async () => {
      const response = await request(app.getHttpServer())
        .post(`${url}/0000000000000`)
        .send({
          body: 'Ghost book',
          stars: 3,
          title: 'Does not exist',
          recommended: false,
        })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer())
        .post(`${url}/${seededIsbn}`)
        .send({ body: 'X', stars: 3, title: 'Y', recommended: true }),
    );
  });

  describe('PUT /api/reviews/:id', () => {
    it('should 200 and update a review', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/${REVIEWS_SEED[0].id}`)
        .send({
          body: 'Updated thoughts on this book.',
          stars: 3,
          title: 'Updated title',
          recommended: false,
        })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: REVIEWS_SEED[0].id,
          title: 'Updated title',
          stars: 3,
          recommended: false,
        }),
      );
    });

    it('should 404 for a non-existing review', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/999999`)
        .send({
          body: 'Ghost review',
          stars: 3,
          title: 'Does not exist',
          recommended: true,
        })
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer())
        .put(`${url}/${REVIEWS_SEED[0].id}`)
        .send({ body: 'X', stars: 3, title: 'Y', recommended: true }),
    );
  });

  describe('DELETE /api/reviews/:id', () => {
    it('should 200 and delete a review', async () => {
      const createResponse = await request(app.getHttpServer())
        .post(`${url}/${seededIsbn}`)
        .send({
          body: 'Temporary review',
          stars: 2,
          title: 'To be deleted',
          recommended: false,
        })
        .auth(userAuthToken, { type: 'bearer' });

      const reviewId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .delete(`${url}/${reviewId}`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
    });

    it('should 404 for a non-existing review', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/999999`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).delete(`${url}/${REVIEWS_SEED[0].id}`),
    );
  });
});
