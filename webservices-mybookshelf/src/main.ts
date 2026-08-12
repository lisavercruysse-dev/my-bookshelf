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
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.LOG_DISABLED === 'true' ? false : undefined,
  });
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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Budget Web Services')
    .setDescription('The Budget API application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: cors.origins,
    maxAge: cors.maxAge,
  });

  if (!log.disabled) {
    app.useLogger(
      new CustomLogger({
        logLevels: log.levels,
      }),
    );
  }

  app.use(helmet());
  app.useGlobalFilters(new DrizzleQueryErrorFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port, () => {
    new Logger().log('🚀 Server listening on http://127.0.0.1:3000');
  });
}
bootstrap();
