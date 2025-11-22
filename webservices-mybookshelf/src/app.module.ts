import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ReviewModule } from './review/review.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [
    BookModule,
    ReviewModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DrizzleModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
