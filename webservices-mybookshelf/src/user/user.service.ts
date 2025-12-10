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
import { and, eq } from 'drizzle-orm';
import { userBooks, users } from 'src/drizzle/schema';
import { BookService } from 'src/book/book.service';
import { ReviewService } from 'src/review/review.service';

@Injectable()
export class UserService {
  bookService: BookService;
  reviewService: ReviewService;
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
      with: { status: true },
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

    return await this.getSavedBook(book.userId, book.isbn);
  }

  async updateSavedBook(
    userId: number,
    isbn: string,
    book: UpdateSavedBookRequestDto,
  ): Promise<savedBookResponseDto> {
    await this.db
      .update(userBooks)
      .set(book)
      .where(and(eq(userBooks.userId, userId), eq(userBooks.isbn, isbn)));

    return this.getSavedBook(userId, isbn);
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

  async deleteUserBook(id: number, isbn: string): Promise<void> {
    const [result] = await this.db
      .delete(userBooks)
      .where(and(eq(userBooks.userId, id), eq(userBooks.isbn, isbn)));
    if (result.affectedRows === 0) {
      throw new NotFoundException(
        'No book with this isbn exists for this user',
      );
    }
  }
}
