import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserRequestDto,
  UserResponseDto,
  UpdateUserRequestDto,
  CreateSavedBookDto,
  savedBookResponseDto,
  UpdateSavedBookRequestDto,
} from './user.dto';
import { ReviewService } from 'src/review/review.service';
import { BookDetailListDto } from 'src/book/book.dto';
import { BookService } from 'src/book/book.service';
import { ReviewListResponseDto } from 'src/review/review.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reviewService: ReviewService,
    private readonly bookService: BookService,
  ) {}
  /*
  @Get()
  async getAllUsers(): Promise<UserListResponseDto> {
    return await this.userService.getAllUsers();
  } */

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserById(id);
  }

  @Get(':id/reviews')
  async getReviewsByUserId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReviewListResponseDto> {
    return await this.reviewService.getReviewsByUserId(id);
  }

  @Get(':id/books')
  async getBooksByUserId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BookDetailListDto> {
    return await this.bookService.getBooksByUserId(id);
  }

  @Get(':userId/books/:isbn')
  async getSavedBook(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('isbn') isbn: string,
  ): Promise<savedBookResponseDto> {
    return await this.userService.getSavedBook(userId, isbn);
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.create(createUserDto);
  }

  @Post('/books')
  async saveBook(
    @Body() createSavedBookDto: CreateSavedBookDto,
  ): Promise<savedBookResponseDto> {
    return await this.userService.createSavedBook(createSavedBookDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.update(id, updateUserDto);
  }

  @Put('/:userId/:isbn')
  async updateSavedBook(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('isbn') isbn: string,
    @Body() updateSavedBookDto: UpdateSavedBookRequestDto,
  ): Promise<savedBookResponseDto> {
    return await this.userService.updateSavedBook(
      userId,
      isbn,
      updateSavedBookDto,
    );
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.delete(id);
  }

  @Delete(':id/books/:isbn')
  async deleteUserBook(
    @Param('id', ParseIntPipe) id: number,
    @Param('isbn') isbn: string,
  ): Promise<void> {
    await this.userService.deleteUserBook(id, isbn);
  }

  @Delete(':userId/reviews/:id')
  async deleteReview(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId') userId: number,
  ): Promise<void> {
    await this.reviewService.delete(id, userId);
  }
}
