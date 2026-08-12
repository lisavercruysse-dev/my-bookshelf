export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '3000'),
  cors: {
    origins: process.env.CORS_ORIGINS
      ? (JSON.parse(process.env.CORS_ORIGINS) as string[])
      : [],
    maxAge: parseInt(process.env.CORS_MAX_AGE || String(3 * 60 * 60)),
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  log: {
    levels: process.env.LOG_LEVELS
      ? (JSON.parse(process.env.LOG_LEVELS) as LogLevel[])
      : ['log', 'error', 'warn'],
    disabled: process.env.LOG_DISABLED === 'true',
  },
  auth: {
    hashLength: parseInt(process.env.AUTH_HASH_LENGTH || '32'),
    timeCost: parseInt(process.env.AUTH_TIME_COST || '6'),
    memoryCost: parseInt(process.env.AUTH_MEMORY_COST || '65536'),
    maxDelay: parseInt(process.env.AUTH_MAX_DELAY || '500'),
    jwt: {
      expirationInterval:
        Number(process.env.AUTH_JWT_EXPIRATION_INTERVAL) || 3600,
      secret: process.env.AUTH_JWT_SECRET || '',
      audience: process.env.AUTH_JWT_AUDIENCE || 'myBookshelf',
      issuer: process.env.AUTH_JWT_ISSUER || 'myBookshelf',
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackUrl:
        process.env.GOOGLE_CALLBACK_URL ||
        'http://localhost:3000/api/sessions/google/callback',
    },
  },
});

export interface JwtConfig {
  expirationInterval: number;
  secret: string;
  audience: string;
  issuer: string;
}

export interface AuthConfig {
  maxDelay: number;
  hashLength: number;
  timeCost: number;
  memoryCost: number;
  jwt: JwtConfig;
  google: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
}

export interface ServerConfig {
  env: string;
  port: number;
  cors: CorsConfig;
  database: DatabaseConfig;
  log: LogConfig;
  auth: AuthConfig;
}

export interface CorsConfig {
  origins: string[];
  maxAge: number;
}

export interface DatabaseConfig {
  url: string;
}

export interface LogConfig {
  levels: LogLevel[];
  disabled: boolean;
}

type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose' | 'fatal';
