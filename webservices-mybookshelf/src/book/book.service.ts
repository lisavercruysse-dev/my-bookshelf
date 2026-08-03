import { Injectable, NotFoundException } from '@nestjs/common';
import {
  BookResponseDTO,
  BookResponseListDTO,
  CreateBookRequestDTO,
} from './book.dto';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { desc, eq, inArray, sql } from 'drizzle-orm';
import { books, reviews } from '../drizzle/schema';

@Injectable()
export class BookService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getCurrentReads(userId: number): Promise<BookResponseListDTO> {
    //get the current reads shelf
    const currentReadsShelf = await this.db.query.shelves.findFirst({
      columns: {
        id: true,
      },
      where: (shelves, { eq, and }) =>
        and(eq(shelves.userId, userId), eq(shelves.title, 'Current Reads')),
    });

    if (!currentReadsShelf)
      throw new NotFoundException(
        'This user does not have a current reads shelf',
      );

    //get books from shelf
    const currentReads = await this.db.query.shelfBooks.findMany({
      where: (shelfBooks, { eq }) =>
        eq(shelfBooks.shelfId, currentReadsShelf.id),
      with: {
        book: true,
      },
    });

    const books = currentReads.map((entry) => entry.book);
    return { items: books };
  }

  async getPopular(): Promise<BookResponseListDTO> {
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

  async create(book: CreateBookRequestDTO): Promise<BookResponseDTO> {
    await this.db
      .insert(books)
      .values(book)
      .onDuplicateKeyUpdate({ set: { ...book } });
    return this.getByIsbn(book.isbn);
  }

  async update(
    isbn: string,
    book: CreateBookRequestDTO,
  ): Promise<BookResponseDTO> {
    const existing = await this.db.query.books.findFirst({
      where: eq(books.isbn, isbn),
    });

    if (!existing) {
      throw new NotFoundException({
        message: 'No book with this ISBN exists',
        details: { isbn },
      });
    }

    await this.db
      .update(books)
      .set({ ...book, isbn })
      .where(eq(books.isbn, isbn));

    return this.getByIsbn(isbn);
  }

  async getByIsbn(isbn: string): Promise<BookResponseDTO> {
    const book = await this.db.query.books.findFirst({
      where: eq(books.isbn, isbn),
    });

    if (!book) {
      throw new NotFoundException({
        message: 'No book with this ISBN exists',
        details: { isbn },
      });
    }

    return book;
  }

  /*



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
