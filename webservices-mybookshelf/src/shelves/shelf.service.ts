import { Injectable, NotFoundException } from '@nestjs/common';
import { BookResponseDTO } from 'src/book/book.dto';
import { DatabaseProvider, InjectDrizzle } from 'src/drizzle/drizzle.provider';
import { shelfBooks, shelves } from 'src/drizzle/schema';
import { CreateShelfDto, ShelfResponseDto } from './shelf.dto';

@Injectable()
export class ShelfService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async addToShelf(
    userId: number,
    shelfId: number,
    isbn: string,
  ): Promise<BookResponseDTO> {
    //Fetch book
    const book = await this.db.query.books.findFirst({
      where: (books, { eq }) => eq(books.isbn, isbn),
    });
    if (!book) {
      throw new NotFoundException(`No book with isbn ${isbn} exists`);
    }

    //Fetch shelf
    const shelf = await this.db.query.shelves.findFirst({
      where: (shelves, { eq, and }) =>
        and(eq(shelves.id, shelfId), eq(shelves.userId, userId)),
    });
    if (!shelf) {
      throw new NotFoundException(
        `No shelf with id ${shelfId} exists for this user`,
      );
    }

    //Add relation
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
    });

    const newShelf = await this.db.query.shelves.findFirst({
      where: (shelves, { eq }) => eq(shelves.id, result.insertId),
    });

    if (!newShelf) {
      throw new NotFoundException('Failed to create shelf');
    }

    return newShelf;
  }
}
