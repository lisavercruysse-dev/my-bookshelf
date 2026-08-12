// test/health.e2e-spec.ts
import { INestApplication } from '@nestjs/common'; // 👈 1
import request from 'supertest'; // 👈 1
import { createTestApp } from './helpers/create-app';

// 👇 2
describe('Health', () => {
  let app: INestApplication; // 👈 3

  beforeAll(async () => {
    app = await createTestApp();
  });
  afterAll(async () => {
    // 👇 8
    await app.close();
  });

  describe('GET /api/health/ping', () => {
    const url = '/api/health/ping';

    // 👇 1
    it('should return pong', async () => {
      const response = await request(app.getHttpServer()).get(url); // 👈 2

      expect(response.statusCode).toBe(200); // 👈 3
      expect(response.body).toEqual({ pong: true }); // 👈 3
    });
  });
});
