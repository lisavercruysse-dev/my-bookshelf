import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  BookResponseDTO,
  BookResponseListDTO,
  CreateBookRequestDTO,
} from './book.dto';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('popular')
  async getPopular(): Promise<BookResponseListDTO> {
    return this.bookService.getPopular();
  }

  @Get(':isbn')
  async getBookByIsbn(@Param('isbn') isbn: string): Promise<BookResponseDTO> {
    return this.bookService.getByIsbn(isbn);
  }

  @Post()
  async createBook(
    @Body() createBookDto: CreateBookRequestDTO,
  ): Promise<BookResponseDTO> {
    return this.bookService.create(createBookDto);
  }

  @Put(':isbn')
  async updateBook(
    @Param('isbn') isbn: string,
    @Body() createBookDto: CreateBookRequestDTO,
  ): Promise<BookResponseDTO> {
    return this.bookService.update(isbn, createBookDto);
  }
  /*


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
  }*/
}
