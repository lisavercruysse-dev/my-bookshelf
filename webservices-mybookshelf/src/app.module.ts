import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ReviewModule } from './review/review.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    UserModule,
    StatusModule,
    BookModule,
    ReviewModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DrizzleModule,
  ],
  controllers: [AppController, HealthController, UserController],
  providers: [AppService],
})
export class AppModule {}
