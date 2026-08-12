import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { ServerConfig } from '../../config/configuration';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService<ServerConfig>) {
    const authConfig = configService.get('auth', { infer: true })!;

    super({
      clientID: authConfig.google.clientId,
      clientSecret: authConfig.google.clientSecret,
      callbackURL: authConfig.google.callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile.emails?.[0]?.value;

    return {
      googleId: profile.id,
      email,
      userName: profile.displayName,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
    };
  }
}
