import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ReviewModule } from 'src/review/review.module';

@Module({
  imports: [DrizzleModule, ReviewModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
