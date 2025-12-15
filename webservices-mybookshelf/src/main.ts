import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CorsConfig, LogConfig, ServerConfig } from './config/configuration';
import { DrizzleQueryErrorFilter } from './drizzle/drizzle-query-error.filter';
import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import CustomLogger from './core/customlogger';
import { HttpExceptionFilter } from './lib/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,

      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.reduce(
          (acc, err) => {
            acc[err.property] = Object.values(err.constraints || {});
            return acc;
          },
          {} as Record<string, string[]>,
        );
        return new BadRequestException({ details: { body: formattedErrors } });
      },
    }),
  );
  const config = app.get(ConfigService<ServerConfig>);
  const log = config.get<LogConfig>('log')!;
  const port = config.get<number>('port')!;
  const cors = config.get<CorsConfig>('cors')!;
  app.enableCors({
    origin: cors.origins,
    maxAge: cors.maxAge,
  });

  app.useLogger(
    new CustomLogger({
      logLevels: log.levels,
    }),
  );

  app.useGlobalFilters(new DrizzleQueryErrorFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port, () => {
    new Logger().log('🚀 Server listening on http://127.0.0.1:3000');
  });
}
bootstrap();
