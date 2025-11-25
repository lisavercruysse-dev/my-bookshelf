import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ReviewService } from 'src/review/review.service';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [DrizzleModule, BookModule],
  controllers: [UserController],
  providers: [UserService, ReviewService],
  exports: [UserService],
})
export class UserModule {}
