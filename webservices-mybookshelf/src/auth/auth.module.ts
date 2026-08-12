import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServerConfig, AuthConfig } from '../config/configuration';
import { ShelfModule } from '../shelves/shelf.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService<ServerConfig>) => {
        const authConfig = configService.get<AuthConfig>('auth')!;

        return {
          secret: authConfig.jwt.secret,
          signOptions: {
            expiresIn: `${authConfig.jwt.expirationInterval}s`,
            audience: authConfig.jwt.audience,
            issuer: authConfig.jwt.issuer,
          },
        };
      },
    }),
    DrizzleModule,
    forwardRef(() => ShelfModule),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
