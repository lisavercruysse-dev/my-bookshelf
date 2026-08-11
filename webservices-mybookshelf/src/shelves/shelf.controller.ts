import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Shelves')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized - you need to be signed in',
})
@Controller('shelves')
@UseGuards(AuthGuard)
export class ShelfController {
  constructor(private readonly shelfService: ShelfService) {}

  @ApiResponse({
    status: 201,
    description:
      'Add a book to a shelf, creating the book first if it does not exist in the db yet',
    type: BookResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Shelf not found',
  })
  @Post(':shelfId/books/:isbn')
  @HttpCode(HttpStatus.CREATED)
  async addBookToShelf(
    @Param('shelfId', ParseIntPipe) shelfId: number,
    @Param('isbn') isbn: string,
    @Body() bookData: CreateBookRequestDTO,
    @CurrentUser() user: Session,
  ): Promise<BookResponseDTO> {
    return this.shelfService.addBook(user.id, shelfId, isbn, bookData);
  }

  @ApiResponse({
    status: 201,
    description: 'Create a new shelf',
    type: ShelfResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createShelf(
    @Body() dto: CreateShelfDto,
    @CurrentUser() user: Session,
  ): Promise<ShelfResponseDto> {
    return await this.shelfService.createShelf(user.id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all shelves belonging to the current user',
    type: ShelfListResponseDTO,
  })
  @Get()
  async getMyShelves(
    @CurrentUser() user: Session,
  ): Promise<ShelfListResponseDTO> {
    return await this.shelfService.getShelvesForUser(user.id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all books on a shelf',
    type: BookResponseListDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Shelf not found',
  })
  @Get(':shelfId/books')
  async getBooksFromShelf(
    @Param('shelfId', ParseIntPipe) shelfId: number,
    @CurrentUser() user: Session,
  ): Promise<BookResponseListDTO> {
    return await this.shelfService.getBooksFromShelf(user.id, shelfId);
  }

  @ApiResponse({
    status: 200,
    description: 'Remove a book from a shelf',
  })
  @ApiResponse({
    status: 404,
    description: 'Shelf or book not found',
  })
  @Delete(':shelfId/books/:isbn')
  async removeFromShelf(
    @Param('shelfId', ParseIntPipe) shelfId: number,
    @Param('isbn') isbn: string,
    @CurrentUser() user: Session,
  ) {
    await this.shelfService.removeFromShelf(user.id, shelfId, isbn);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete a shelf',
  })
  @ApiResponse({
    status: 404,
    description: 'Shelf not found',
  })
  @Delete(':shelfId')
  async deleteShelf(
    @Param('shelfId', ParseIntPipe) shelfId: number,
    @CurrentUser() user: Session,
  ) {
    await this.shelfService.deleteShelf(user.id, shelfId);
  }

  @ApiResponse({
    status: 200,
    description: 'Edit a shelf',
    type: ShelfResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Shelf not found',
  })
  @Put(':shelfId')
  async editShelf(
    @Param('shelfId', ParseIntPipe) shelfId: number,
    @CurrentUser() user: Session,
    @Body() dto: CreateShelfDto,
  ) {
    await this.shelfService.editShelf(user.id, shelfId, dto);
  }

  @ApiResponse({
    status: 200,
    description: "Get the current user's 'Finished' shelf with its books",
    type: ShelfWithBooksResponseDTO,
  })
  @Get('finished')
  async getFinishedShelf(
    @CurrentUser() user: Session,
  ): Promise<ShelfWithBooksResponseDTO> {
    return await this.shelfService.getFinishedShelf(user.id);
  }
}
