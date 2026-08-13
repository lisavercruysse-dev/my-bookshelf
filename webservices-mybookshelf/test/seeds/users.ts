// test/seeds/users.ts
import { INestApplication } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { users } from '../../src/drizzle/schema';
import { Role } from '../../src/auth/roles';

export async function seedUsers(
  app: INestApplication,
  drizzle: DatabaseProvider,
) {
  const authService = app.get(AuthService);
  const passwordHash = await authService.hashPassword('example1');

  await drizzle.insert(users).values([
    {
      id: 1,
      userName: 'Bob',
      email: 'bob.callahan@example.com',
      passwordHash,
      roles: [Role.USER],
    },
    {
      id: 2,
      userName: 'Alice',
      email: 'alice@example.com',
      passwordHash,
      roles: [Role.USER, Role.ADMIN],
    },
  ]);
}

export async function clearUsers(drizzle: DatabaseProvider) {
  await drizzle.delete(users);
}
