import { INestApplication, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';

export const login = async (app: INestApplication): Promise<string> => {
  const authService = app.get(AuthService);

  const user = await authService.validateUser(
    'bob.callahan@example.com',
    'example1',
  );
  if (!user) {
    throw new UnauthorizedException('Invalid test credentials');
  }

  const token = await authService.login(user);
  if (!token) {
    throw new Error('No token received');
  }

  return token;
};

export const loginAdmin = async (app: INestApplication): Promise<string> => {
  const authService = app.get(AuthService);

  const user = await authService.validateUser('alice@example.com', '12345678');
  if (!user) {
    throw new UnauthorizedException('Invalid test credentials');
  }

  const token = await authService.login(user);
  if (!token) {
    throw new Error('No token received');
  }

  return token;
};
