import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  BookResponseDTO,
  BookResponseListDTO,
  CreateBookRequestDTO,
} from './book.dto';
import { BookService } from './book.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('books')
@UseGuards(AuthGuard)
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
  @Roles(Role.ADMIN)
  async createBook(
    @Body() createBookDto: CreateBookRequestDTO,
  ): Promise<BookResponseDTO> {
    return this.bookService.create(createBookDto);
  }

  @Put(':isbn')
  @Roles(Role.ADMIN)
  async updateBook(
    @Param('isbn') isbn: string,
    @Body() createBookDto: CreateBookRequestDTO,
  ): Promise<BookResponseDTO> {
    return this.bookService.update(isbn, createBookDto);
  }

  @Delete(':isbn')
  @Roles(Role.ADMIN)
  async deleteBook(@Param('isbn') isbn: string): Promise<void> {
    await this.bookService.delete(isbn);
  }
}
