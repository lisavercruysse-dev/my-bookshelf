import { Injectable } from '@nestjs/common';
import { BookListResponseDto } from './book.dto';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { desc, inArray, sql } from 'drizzle-orm';
import { books, reviews } from '../drizzle/schema';

@Injectable()
export class BookService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getPopular(): Promise<BookListResponseDto> {
    const MIN_REVIEWS = 10;

    const [{ globalAvg }] = await this.db
      .select({ globalAvg: sql<number>`AVG(${reviews.stars})` })
      .from(reviews);

    const ga = Number(globalAvg) || 0;

    const weightedScore = sql<number>`
    (COUNT(*) / (COUNT(*) + ${MIN_REVIEWS})) * AVG(${reviews.stars})
    + (${MIN_REVIEWS} / (COUNT(*) + ${MIN_REVIEWS})) * ${ga}
  `.as('weightedScore');

    const popular = await this.db
      .select({
        isbn: reviews.isbn,
        reviewCount: sql<number>`COUNT(*)`.as('reviewCount'),
        avgRating: sql<number>`AVG(${reviews.stars})`.as('avgRating'),
        weightedScore,
      })
      .from(reviews)
      .groupBy(reviews.isbn)
      .orderBy(desc(weightedScore))
      .limit(10);

    const isbns = popular.map((p) => p.isbn);

    const booksResult = await this.db
      .select()
      .from(books)
      .where(inArray(books.isbn, isbns));

    const orderMap = new Map(isbns.map((isbn, index) => [isbn, index]));
    const sortedBooks = booksResult.sort(
      (a, b) => orderMap.get(a.isbn)! - orderMap.get(b.isbn)!,
    );

    return {
      items: sortedBooks,
    };
  }
  /*
  async getByIsbn(isbn: string): Promise<BookWithReviewResponseDto> {
    const book = await this.db.query.books.findFirst({
      where: eq(books.isbn, isbn),
      with: {
        reviews: true,
      },
    });

    if (!book) {
      throw new NotFoundException({
        message: 'No book with this ISBN exists',
        details: { isbn },
      });
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
  }*/
}
