import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { BookResponseDTO } from 'src/book/book.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { Session } from '../types/auth';
import { CreateShelfDto, ShelfResponseDto } from './shelf.dto';

@Controller('shelves')
@UseGuards(AuthGuard)
export class ShelfController {
  constructor(private readonly shelfService: ShelfService) {}

  @Post(':shelfId/books/:isbn')
  async addToShelf(
    @Param('shelfId', ParseIntPipe) shelfId: number,
    @Param('isbn') isbn: string,
    @CurrentUser() user: Session,
  ): Promise<BookResponseDTO> {
    return await this.shelfService.addToShelf(user.id, shelfId, isbn);
  }

  @Post()
  async createShelf(
    @Body() dto: CreateShelfDto,
    @CurrentUser() user: Session,
  ): Promise<ShelfResponseDto> {
    return await this.shelfService.createShelf(user.id, dto);
  }
}
