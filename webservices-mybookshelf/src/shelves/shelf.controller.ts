import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ShelfService } from './shelf.service';
import {
  BookResponseDTO,
  BookResponseListDTO,
  CreateBookRequestDTO,
} from 'src/book/book.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { Session } from '../types/auth';
import {
  CreateShelfDto,
  ShelfListResponseDTO,
  ShelfResponseDto,
  ShelfWithBooksResponseDTO,
} from './shelf.dto';

@Controller('shelves')
@UseGuards(AuthGuard)
export class ShelfController {
  constructor(private readonly shelfService: ShelfService) {}

  @Post(':shelfId/books/:isbn')
  async addBookToShelf(
    @Param('shelfId') shelfId: number,
    @Param('isbn') isbn: string,
    @Body() bookData: CreateBookRequestDTO,
    @CurrentUser() userId: number,
  ): Promise<BookResponseDTO> {
    return this.shelfService.addBook(userId, shelfId, isbn, bookData);
  }

  @Post()
  async createShelf(
    @Body() dto: CreateShelfDto,
    @CurrentUser() user: Session,
  ): Promise<ShelfResponseDto> {
    return await this.shelfService.createShelf(user.id, dto);
  }

  @Get()
  async getMyShelves(
    @CurrentUser() user: Session,
  ): Promise<ShelfListResponseDTO> {
    return await this.shelfService.getShelvesForUser(user.id);
  }

  @Get(':shelfId/books')
  async getBooksFromShelf(
    @Param('shelfId', ParseIntPipe) shelfId: number,
    @CurrentUser() user: Session,
  ): Promise<BookResponseListDTO> {
    return await this.shelfService.getBooksFromShelf(user.id, shelfId);
  }

  @Delete(':shelfId/books/:isbn')
  async removeFromShelf(
    @Param('shelfId', ParseIntPipe) shelfId: number,
    @Param('isbn') isbn: string,
    @CurrentUser() user: Session,
  ) {
    await this.shelfService.removeFromShelf(user.id, shelfId, isbn);
  }

  @Delete(':shelfId')
  async deleteShelf(
    @Param('shelfId', ParseIntPipe) shelfId: number,
    @CurrentUser() user: Session,
  ) {
    await this.shelfService.deleteShelf(user.id, shelfId);
  }

  @Put(':shelfId')
  async editShelf(
    @Param('shelfId', ParseIntPipe) shelfId: number,
    @CurrentUser() user: Session,
    @Body() dto: CreateShelfDto,
  ) {
    await this.shelfService.editShelf(user.id, shelfId, dto);
  }

  @Get('finished')
  async getFinishedShelf(
    @CurrentUser() user: Session,
  ): Promise<ShelfWithBooksResponseDTO> {
    return await this.shelfService.getFinishedShelf(user.id);
  }
}
