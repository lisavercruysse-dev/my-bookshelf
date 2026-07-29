import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { ReviewModule } from '../review/review.module';

@Module({
  imports: [DrizzleModule, ReviewModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
