import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, AuthConfig } from '../../config/configuration';
import { JwtPayload } from '../../types/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService<ServerConfig>) {
    const authConfig = configService.get<AuthConfig>('auth')!;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.jwt.secret,
      audience: authConfig.jwt.audience,
      issuer: authConfig.jwt.issuer,
    });
  }

  validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      roles: payload.roles,
      email: payload.email,
    };
  }
}
