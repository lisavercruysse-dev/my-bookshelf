import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateBookRequestDto,
  BookListResponseDto,
  BookResponseDto,
  UpdateBookRequestDto,
} from './book.dto';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from 'src/drizzle/drizzle.provider';
import { eq } from 'drizzle-orm';
import { books } from 'src/drizzle/schema';

@Injectable()
export class BookService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<BookListResponseDto> {
    const items = await this.db.query.books.findMany();
    return { items };
  }

  async getByIsbn(isbn: string): Promise<BookResponseDto> {
    const book = await this.db.query.books.findFirst({
      where: eq(books.isbn, isbn),
    });

    if (!book) {
      throw new NotFoundException('No book with this ISBN exists');
    }

    return book;
  }

  async create(book: CreateBookRequestDto): Promise<BookResponseDto> {
    await this.db.insert(books).values(book);
    return this.getByIsbn(book.isbn);
  }

  async update(
    isbn: string,
    updateBook: UpdateBookRequestDto,
  ): Promise<BookResponseDto> {
    await this.db.update(books).set(updateBook).where(eq(books.isbn, isbn));
    return this.getByIsbn(isbn);
  }

  async delete(isbn: string): Promise<void> {
    const [result] = await this.db.delete(books).where(eq(books.isbn, isbn));

    if (result.affectedRows === 0) {
      throw new NotFoundException('No book with this ISBN exists');
    }
  }
}
