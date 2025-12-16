import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserResponseDto,
  CreateSavedBookDto,
  savedBookResponseDto,
  UpdateSavedBookRequestDto,
  RegisterUserRequestDto,
  UserListResponseDto,
} from './user.dto';
import { ReviewService } from 'src/review/review.service';
import { BookDetailListDto } from 'src/book/book.dto';
import { BookService } from 'src/book/book.service';
import { ReviewListResponseDto } from 'src/review/review.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginResponseDto } from 'src/session/session.dto';
import { Role } from '../auth/roles';
import { type Session } from '../types/auth';
import { CheckUserAccessGuard } from 'src/auth/guards/userAcces.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { ParseUserIdPipe } from 'src/auth/pipes/parseUserId.pipe';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reviewService: ReviewService,
    private readonly bookService: BookService,
    private readonly authService: AuthService,
  ) {}

  @Get(Role.ADMIN)
  async getAllUsers(): Promise<UserListResponseDto> {
    return await this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(CheckUserAccessGuard)
  async getUserById(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<UserResponseDto> {
    const userId = id === 'me' ? user.id : id;
    return await this.userService.getUserById(userId);
  }

  @Get(':id/reviews')
  @UseGuards(CheckUserAccessGuard)
  async getReviewsByUserId(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<ReviewListResponseDto> {
    const userId = id === 'me' ? user.id : id;
    return await this.reviewService.getReviewsByUserId(userId);
  }

  @Get(':id/books')
  @UseGuards(CheckUserAccessGuard)
  async getBooksByUserId(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<BookDetailListDto> {
    const userId = id === 'me' ? user.id : id;
    return await this.bookService.getBooksByUserId(userId);
  }

  @Get(':userId/books/:isbn')
  @UseGuards(CheckUserAccessGuard)
  async getSavedBook(
    @Param('userId', ParseUserIdPipe) id: 'me' | number,
    @Param('isbn') isbn: string,
    @CurrentUser() user: Session,
  ): Promise<savedBookResponseDto> {
    const userId = id === 'me' ? user.id : id;
    return await this.userService.getSavedBook(userId, isbn);
  }
  /*
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.create(createUserDto);
  }
*/

  @Post()
  async registerUser(
    @Body() registerDto: RegisterUserRequestDto,
  ): Promise<LoginResponseDto> {
    const token = await this.authService.register(registerDto);
    return { token };
  }

  @Post('/books')
  async saveBook(
    @Body() createSavedBookDto: CreateSavedBookDto,
  ): Promise<savedBookResponseDto> {
    return await this.userService.createSavedBook(createSavedBookDto);
  }
  /*
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.update(id, updateUserDto);
  }
*/
  @Put('/:userId/:isbn')
  @UseGuards(CheckUserAccessGuard)
  async updateSavedBook(
    @Param('userId', ParseUserIdPipe) id: 'me' | number,
    @Param('isbn') isbn: string,
    @CurrentUser() user: Session,
    @Body() updateSavedBookDto: UpdateSavedBookRequestDto,
  ): Promise<savedBookResponseDto> {
    return await this.userService.updateSavedBook(
      id === 'me' ? user.id : id,
      isbn,
      updateSavedBookDto,
    );
  }

  @Delete(':id')
  @UseGuards(CheckUserAccessGuard)
  async deleteUser(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<void> {
    await this.userService.delete(id === 'me' ? user.id : id);
  }

  @Delete(':id/books/:isbn')
  @UseGuards(CheckUserAccessGuard)
  async deleteUserBook(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @Param('isbn') isbn: string,
    @CurrentUser() user: Session,
  ): Promise<void> {
    await this.userService.deleteUserBook(id === 'me' ? user.id : id, isbn);
  }

  @Delete(':userId/reviews/:id')
  @UseGuards(CheckUserAccessGuard)
  async deleteReview(
    @Param('id', ParseUserIdPipe) reviewId: number,
    @Param('userId') id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<void> {
    await this.reviewService.delete(reviewId, id === 'me' ? user.id : id);
  }
}
