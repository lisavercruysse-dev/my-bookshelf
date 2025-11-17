import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  BookListResponseDto,
  BookResponseDto,
  CreateBookRequestDto,
} from './book.dto';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks(): BookListResponseDto {
    return this.bookService.getAll();
  }

  @Get(':isbn')
  getBookByIsbn(@Param('isbn') isbn: string): BookResponseDto {
    return this.bookService.getByIsbn(isbn);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBook(@Body() createBookDto: CreateBookRequestDto): BookResponseDto {
    return this.bookService.create(createBookDto);
  }
}
