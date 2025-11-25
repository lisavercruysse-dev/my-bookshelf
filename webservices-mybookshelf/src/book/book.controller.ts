import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  BookListResponseDto,
  BookResponseDto,
  BookWithReviewResponseDto,
  CreateBookRequestDto,
} from './book.dto';
import { BookService } from './book.service';
import { ReviewService } from 'src/review/review.service';

@Controller('books')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly reviewService: ReviewService,
  ) {}

  @Get('popular')
  async getPopular(): Promise<BookListResponseDto> {
    return this.bookService.getPopular();
  }

  @Get(':isbn')
  async getBookByIsbn(
    @Param('isbn') isbn: string,
  ): Promise<BookWithReviewResponseDto> {
    return this.bookService.getByIsbn(isbn);
  }

  @Post()
  async createBook(
    @Body() createBookDto: CreateBookRequestDto,
  ): Promise<BookResponseDto> {
    return this.bookService.create(createBookDto);
  }

  @Delete(':isbn')
  async deleteBook(@Param('isbn') isbn: string): Promise<void> {
    await this.bookService.delete(isbn);
  }

  @Put(':isbn')
  async updateBook(
    @Param('isbn') isbn: string,
    @Body() updateBookDto: CreateBookRequestDto,
  ): Promise<BookResponseDto> {
    return this.bookService.update(isbn, updateBookDto);
  }
}
