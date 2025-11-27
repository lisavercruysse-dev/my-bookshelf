import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from 'src/drizzle/drizzle.provider';
import {
  CreateSavedBookDto,
  CreateUserRequestDto,
  savedBookResponseDto,
  UpdateSavedBookRequestDto,
  UserListResponseDto,
  UserResponseDto,
} from './user.dto';
import { and, eq, sql } from 'drizzle-orm';
import { books, userBooks, users } from 'src/drizzle/schema';
import { BookService } from 'src/book/book.service';

@Injectable()
export class UserService {
  bookService: BookService;
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAllUsers(): Promise<UserListResponseDto> {
    const items = await this.db.query.users.findMany();
    return { items };
  }

  async getUserById(id: number) {
    const item = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!item) {
      throw new NotFoundException('No user with this ID exists');
    }

    return item;
  }

  async getSavedBook(
    userId: number,
    isbn: string,
  ): Promise<savedBookResponseDto> {
    console.log('Looking for saved book', { userId, isbn });

    const savedBook = await this.db.query.userBooks.findFirst({
      where: and(eq(userBooks.userId, userId), eq(userBooks.isbn, isbn)),
    });

    if (!savedBook) {
      throw new NotFoundException('No saved book found for this user and ISBN');
    }

    return savedBook;
  }

  async create(user: CreateUserRequestDto): Promise<UserResponseDto> {
    const [newUser] = await this.db.insert(users).values(user).$returningId();

    return this.getUserById(newUser.id);
  }

  async createSavedBook(
    book: CreateSavedBookDto,
  ): Promise<savedBookResponseDto> {
    await this.db.insert(userBooks).values({
      ...book,
      dateStarted: book.dateStarted ? new Date(book.dateStarted) : null,
      dateEnded: book.dateEnded ? new Date(book.dateEnded) : null,
    });

    const savedBook = await this.getSavedBook(book.userId, book.isbn);
    if (savedBook.favorite) {
      await this.db
        .update(books)
        .set({
          favoriteCount: sql`${books.favoriteCount} + 1`,
        })
        .where(eq(books.isbn, savedBook.isbn));
    }

    return savedBook;
  }

  async updateSavedBook(
    userId: number,
    isbn: string,
    book: UpdateSavedBookRequestDto,
  ): Promise<savedBookResponseDto> {
    const oldBook = await this.getSavedBook(userId, isbn);
    await this.db
      .update(userBooks)
      .set(book)
      .where(and(eq(userBooks.userId, userId), eq(userBooks.isbn, isbn)));

    const savedBook = await this.getSavedBook(userId, isbn);
    if (oldBook.favorite !== savedBook.favorite) {
      const change = savedBook.favorite ? 1 : -1;
      await this.db
        .update(books)
        .set({
          favoriteCount: sql`${books.favoriteCount} + ${change}`,
        })
        .where(eq(books.isbn, isbn));
    }
    return savedBook;
  }

  async update(
    id: number,
    user: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    await this.db.update(users).set(user).where(eq(users.id, id));
    return this.getUserById(id);
  }

  async delete(id: number): Promise<void> {
    const [result] = await this.db.delete(users).where(eq(users.id, id));
    if (result.affectedRows === 0) {
      throw new NotFoundException('No user with this ID exists');
    }
  }
}
