import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserResponseDto,
  UserListResponseDto,
  RegisterUserRequestDto,
} from './user.dto';
import { ReviewService } from '../review/review.service';
import { BookService } from '../book/book.service';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/roles';
import { type Session } from '../types/auth';
import { CheckUserAccessGuard } from '../auth/guards/userAcces.guard';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { ParseUserIdPipe } from '../auth/pipes/parseUserId.pipe';
import { BookResponseListDTO } from '../book/book.dto';
import { LoginResponseDto } from 'src/session/session.dto';
import { Public } from 'src/auth/decorators/public.decorator';

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

  @Get(':id/reading')
  @UseGuards(CheckUserAccessGuard)
  async getCurrentReadsByUserId(
    @Param('id', ParseUserIdPipe) id: 'me' | number,
    @CurrentUser() user: Session,
  ): Promise<BookResponseListDTO> {
    const userId = id === 'me' ? user.id : id;
    return await this.bookService.getCurrentReads(userId);
  }

  @Public()
  @Post()
  async registerUser(
    @Body() registerDto: RegisterUserRequestDto,
  ): Promise<LoginResponseDto> {
    const token = await this.authService.register(registerDto);
    return { token };
  }

  /*
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

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.update(id, updateUserDto);
  }

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
  }*/
}
