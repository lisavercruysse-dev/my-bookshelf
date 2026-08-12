import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  BookResponseDTO,
  BookResponseListDTO,
  CreateBookRequestDTO,
} from '../book/book.dto';
import { DatabaseProvider, InjectDrizzle } from '../drizzle/drizzle.provider';
import { shelfBooks, shelves } from '../drizzle/schema';
import {
  CreateShelfDto,
  DEFAULT_SHELVES,
  ShelfListResponseDTO,
  ShelfResponseDto,
  ShelfWithBooksResponseDTO,
} from './shelf.dto';
import { and, eq, sql } from 'drizzle-orm';
import { BookService } from '../book/book.service';

@Injectable()
export class ShelfService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
    private readonly bookService: BookService,
  ) {}

  async addBook(
    userId: number,
    shelfId: number,
    isbn: string,
    bookData?: CreateBookRequestDTO,
  ): Promise<BookResponseDTO> {
    const shelf = await this.db.query.shelves.findFirst({
      where: (shelves, { eq, and }) =>
        and(eq(shelves.id, shelfId), eq(shelves.userId, userId)),
    });
    if (!shelf) {
      throw new NotFoundException(
        `No shelf with id ${shelfId} exists for this user`,
      );
    }

    let book = await this.db.query.books.findFirst({
      where: (books, { eq }) => eq(books.isbn, isbn),
    });

    if (!book) {
      if (!bookData) {
        throw new NotFoundException(`No book with isbn ${isbn} exists`);
      }
      book = await this.bookService.create(bookData);
    }

    await this.db.insert(shelfBooks).values({ shelfId, isbn: book.isbn });

    return book;
  }

  async createShelf(
    userId: number,
    dto: CreateShelfDto,
  ): Promise<ShelfResponseDto> {
    const [result] = await this.db.insert(shelves).values({
      title: dto.title,
      userId,
      canDelete: true,
      dateAdded: new Date(),
      description: dto.description,
    });

    const newShelf = await this.db.query.shelves.findFirst({
      where: (shelves, { eq }) => eq(shelves.id, result.insertId),
    });

    if (!newShelf) {
      throw new NotFoundException('Failed to create shelf');
    }

    return newShelf;
  }

  async getShelvesForUser(userId: number): Promise<ShelfListResponseDTO> {
    const items = await this.db.query.shelves.findMany({
      where: (shelves, { eq }) => eq(shelves.userId, userId),
      with: {
        shelfBooks: {
          with: {
            book: true,
          },
        },
      },
    });

    const shelvesWithBooks: ShelfWithBooksResponseDTO[] = items.map(
      (shelf) => ({
        id: shelf.id,
        title: shelf.title,
        userId: shelf.userId,
        canDelete: shelf.canDelete,
        shelfBooks: shelf.shelfBooks.map(({ isbn }) => ({ isbn })),
        books: shelf.shelfBooks.map((shelfBook) => shelfBook.book),
        description: shelf.description,
      }),
    );

    return { items: shelvesWithBooks };
  }

  async getBooksFromShelf(
    userId: number,
    shelfId: number,
  ): Promise<BookResponseListDTO> {
    const shelf = await this.db.query.shelves.findFirst({
      where: (shelves, { eq, and }) =>
        and(eq(shelves.id, shelfId), eq(shelves.userId, userId)),
    });

    if (!shelf) {
      throw new NotFoundException(
        `No shelf with id ${shelfId} exists for this user`,
      );
    }

    const shelfBookEntries = await this.db.query.shelfBooks.findMany({
      where: (shelfBooks, { eq }) => eq(shelfBooks.shelfId, shelfId),
      with: {
        book: true,
      },
    });

    const items = shelfBookEntries.map((entry) => entry.book);
    return { items };
  }

  async removeFromShelf(userId: number, shelfId: number, isbn: string) {
    const shelf = await this.db.query.shelves.findFirst({
      where: (shelves, { eq, and }) =>
        and(eq(shelves.id, shelfId), eq(shelves.userId, userId)),
    });

    if (!shelf) {
      throw new NotFoundException(
        `No shelf with id ${shelfId} exists for this user`,
      );
    }

    const book = await this.db.query.books.findFirst({
      where: (books, { eq }) => eq(books.isbn, isbn),
    });

    if (!book) {
      throw new NotFoundException(`No book with ISBN ${isbn} exists`);
    }

    await this.db
      .delete(shelfBooks)
      .where(
        and(eq(shelfBooks.shelfId, shelfId), eq(shelfBooks.isbn, book.isbn)),
      );
  }

  async deleteShelf(userId: number, shelfId: number): Promise<void> {
    const shelf = await this.db.query.shelves.findFirst({
      where: (shelves, { eq, and }) =>
        and(eq(shelves.id, shelfId), eq(shelves.userId, userId)),
    });

    if (!shelf) {
      throw new NotFoundException(
        `No shelf with id ${shelfId} exists for this user`,
      );
    }

    if (!shelf.canDelete) {
      throw new ForbiddenException(
        `Shelf with id ${shelfId} cannot be deleted`,
      );
    }

    await this.db.delete(shelves).where(eq(shelves.id, shelfId));
  }

  async editShelf(
    userId: number,
    shelfId: number,
    dto: CreateShelfDto,
  ): Promise<void> {
    const shelf = await this.db.query.shelves.findFirst({
      where: (shelves, { eq, and }) =>
        and(eq(shelves.id, shelfId), eq(shelves.userId, userId)),
    });

    if (!shelf) {
      throw new NotFoundException(
        `No shelf with id ${shelfId} exists for this user`,
      );
    }

    if (!shelf.canDelete) {
      throw new ForbiddenException(`Shelf with id ${shelfId} cannot be edited`);
    }

    await this.db
      .update(shelves)
      .set({
        title: dto.title,
        description: dto.description,
      })
      .where(eq(shelves.id, shelfId));
  }

  async getFinishedShelf(userId: number): Promise<ShelfWithBooksResponseDTO> {
    const shelf = await this.db.query.shelves.findFirst({
      where: (shelves, { eq, and }) =>
        and(
          eq(shelves.userId, userId),
          eq(sql`lower(${shelves.title})`, 'finished'),
        ),
      with: {
        shelfBooks: {
          with: {
            book: true,
          },
        },
      },
    });

    if (!shelf) {
      throw new NotFoundException(`This user does not have a 'finished' shelf`);
    }

    return {
      id: shelf.id,
      title: shelf.title,
      userId: shelf.userId,
      canDelete: shelf.canDelete,
      books: shelf.shelfBooks.map((shelfBook) => shelfBook.book),
      description: shelf.description,
    };
  }

  async createDefaultShelves(userId: number, tx = this.db) {
    await tx.insert(shelves).values(
      DEFAULT_SHELVES.map(({ title, description }) => ({
        title,
        userId,
        canDelete: false,
        dateAdded: new Date(),
        description,
      })),
    );
  }
}
