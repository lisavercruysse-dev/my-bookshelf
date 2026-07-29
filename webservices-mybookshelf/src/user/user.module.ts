import { Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ReviewService } from '../review/review.service';
import { BookModule } from '../book/book.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DrizzleModule, BookModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, ReviewService],
  exports: [UserService],
})
export class UserModule {}
