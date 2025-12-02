import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CorsConfig, ServerConfig } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<ServerConfig>);
  const port = config.get<number>('port')!;
  const cors = config.get<CorsConfig>('cors')!;
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: cors.origins,
    maxAge: cors.maxAge,
  });

  await app.listen(port);
}
bootstrap();
