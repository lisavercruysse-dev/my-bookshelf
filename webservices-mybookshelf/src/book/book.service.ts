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

  getPopular(): BookListResponseDto {
    const C =
      BOOKS.reduce((acc, b) => acc + (b.avgRating ?? 0), 0) / BOOKS.length;
    const m = 60; // minimum votes threshold

    const scored = [...BOOKS].map((b) => {
      const v = b.ratingCount ?? 0;
      const R = b.avgRating ?? 0;
      const weightedScore = (v / (v + m)) * R + (m / (v + m)) * C;
      return { ...b, weightedScore };
    });

    const sorted = scored.sort((a, b) => b.weightedScore - a.weightedScore);

    return { items: sorted };
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
    avgRating,
    ratingCount,
  }: CreateBookRequestDto): BookResponseDto {
    const newBook = {
      isbn,
      title,
      genre,
      amountPages,
      author,
      description,
      avgRating,
      ratingCount,
    };
    BOOKS.push(newBook);
    return newBook;
  }
}
