import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, AuthConfig } from '../config/configuration';
import * as argon2 from 'argon2';
import { User } from '../types/user';
import { eq } from 'drizzle-orm';
import { users } from '../drizzle/schema';
import { RegisterUserRequestDto } from '../user/user.dto';
import { Role } from './roles';
import { ShelfService } from '../shelves/shelf.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ServerConfig>,
    private readonly shelfService: ShelfService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const authConfig = this.configService.get<AuthConfig>('auth')!;
    return argon2.hash(password, {
      type: argon2.argon2id,
      hashLength: authConfig.hashLength,
      timeCost: authConfig.timeCost,
      memoryCost: authConfig.memoryCost,
    });
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }

  private signJwt(user: User): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user || !user.passwordHash) {
      return null;
    }

    const passwordValid = await this.verifyPassword(
      password,
      user.passwordHash,
    );

    if (!passwordValid) {
      return null;
    }

    return user;
  }

  async login(user: User): Promise<string> {
    return this.signJwt(user);
  }

  async register({
    userName,
    email,
    password,
  }: RegisterUserRequestDto): Promise<string> {
    const passwordHash = await this.hashPassword(password);

    const [newUser] = await this.db
      .insert(users)
      .values({
        userName,
        email,
        passwordHash: passwordHash,
        roles: [Role.USER],
      })
      .$returningId();

    const user = await this.db.query.users.findFirst({
      where: eq(users.id, newUser.id),
    });

    if (user) {
      await this.shelfService.createDefaultShelves(user.id);
    }

    return this.signJwt(user!);
  }

  async validateOAuthLogin(googleUser: {
    googleId: string;
    email?: string;
    userName?: string;
  }): Promise<string> {
    if (!googleUser.email) {
      throw new UnauthorizedException('Google account has no email');
    }

    let user = await this.db.query.users.findFirst({
      where: eq(users.email, googleUser.email),
    });

    if (!user) {
      const [newUser] = await this.db
        .insert(users)
        .values({
          userName: googleUser.userName ?? googleUser.email.split('@')[0],
          email: googleUser.email,
          passwordHash: null,
          roles: [Role.USER],
        })
        .$returningId();

      user = await this.db.query.users.findFirst({
        where: eq(users.id, newUser.id),
      });

      await this.shelfService.createDefaultShelves(user!.id);
    }

    return this.signJwt(user!);
  }
}
