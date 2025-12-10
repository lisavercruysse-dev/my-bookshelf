import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateBookRequestDto,
  BookListResponseDto,
  BookResponseDto,
  UpdateBookRequestDto,
  BookDetailListDto,
  BookWithReviewResponseDto,
} from './book.dto';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from 'src/drizzle/drizzle.provider';
import { desc, eq, inArray, sql } from 'drizzle-orm';
import { books, userBooks } from 'src/drizzle/schema';

@Injectable()
export class BookService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getPopular(): Promise<BookListResponseDto> {
    const popular = await this.db
      .select({
        isbn: userBooks.isbn,
        count: sql<number>`COUNT(*)`,
      })
      .from(userBooks)
      .groupBy(userBooks.isbn)
      .orderBy(desc(sql`COUNT(*)`))
      .limit(10);

    const isbns = popular.map((p) => p.isbn);

    const booksResult = await this.db
      .select()
      .from(books)
      .where(inArray(books.isbn, isbns));

    return {
      items: booksResult,
    };
  }

  async getByIsbn(isbn: string): Promise<BookWithReviewResponseDto> {
    const book = await this.db.query.books.findFirst({
      where: eq(books.isbn, isbn),
      with: {
        reviews: true,
      },
    });

    if (!book) {
      throw new NotFoundException('No book with this ISBN exists');
    }

    return book;
  }

  async getBooksByUserId(id: number): Promise<BookDetailListDto> {
    const items = await this.db.query.userBooks.findMany({
      where: eq(userBooks.userId, id),
      with: {
        book: true,
        status: true,
      },
    });

    return { items };
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
