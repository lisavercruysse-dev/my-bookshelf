import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized - you need to be signed in',
})
@Controller('books')
@UseGuards(AuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiResponse({
    status: 200,
    description: 'Get the popular books based on a weighted score',
    type: BookResponseListDTO,
  })
  @Get('popular')
  async getPopular(): Promise<BookResponseListDTO> {
    return this.bookService.getPopular();
  }

  @ApiResponse({
    status: 200,
    description: 'Get a book by isbn',
    type: BookResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  @Get(':isbn')
  async getBookByIsbn(@Param('isbn') isbn: string): Promise<BookResponseDTO> {
    return this.bookService.getByIsbn(isbn);
  }

  @ApiResponse({
    status: 201,
    description: 'Create a new book',
    type: BookResponseDTO,
  })
  @Post()
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async createBook(
    @Body() createBookDto: CreateBookRequestDTO,
  ): Promise<BookResponseDTO> {
    return this.bookService.create(createBookDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Update a book',
    type: BookResponseDTO,
  })
  @Put(':isbn')
  @Roles(Role.ADMIN)
  async updateBook(
    @Param('isbn') isbn: string,
    @Body() createBookDto: CreateBookRequestDTO,
  ): Promise<BookResponseDTO> {
    return this.bookService.update(isbn, createBookDto);
  }

  @ApiResponse({
    status: 204,
    description: 'Delete book with isbn',
  })
  @ApiResponse({
    status: 404,
    description: 'Book does not exist',
  })
  @Delete(':isbn')
  @Roles(Role.ADMIN)
  async deleteBook(@Param('isbn') isbn: string): Promise<void> {
    await this.bookService.delete(isbn);
  }
}
