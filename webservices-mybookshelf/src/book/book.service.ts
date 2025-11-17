import { Injectable, NotFoundException } from '@nestjs/common';
import { BOOKS, Book } from 'src/data/mock_data';
import {
  CreateBookRequestDto,
  BookListResponseDto,
  BookResponseDto,
} from './book.dto';

@Injectable()
export class BookService {
  getAll(): BookListResponseDto {
    return {
      items: BOOKS,
    };
  }

  getByIsbn(isbn: string): BookResponseDto {
    const book = BOOKS.find((b: Book) => b.isbn === isbn);

    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  create({
    isbn,
    title,
    genre,
    amountPages,
    author,
    description,
  }: CreateBookRequestDto): BookResponseDto {
    const newBook = {
      isbn,
      title,
      genre,
      amountPages,
      author,
      description,
    };
    BOOKS.push(newBook);
    return newBook;
  }
}
