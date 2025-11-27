import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  async getUserById(@Param('id') id: number): Promise<UserResponseDto> {
    return await this.userService.getUserById(id);
  }

  @Get(':id/reviews')
  async getReviewsByUserId(
    @Param('id') id: number,
  ): Promise<ReviewListResponseDto> {
    return await this.reviewService.getReviewsByUserId(id);
  }

  @Get(':id/books')
  async getBooksByUserId(@Param('id') id: number): Promise<BookDetailListDto> {
    return await this.bookService.getBooksByUserId(id);
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
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.update(id, updateUserDto);
  }

  @Put('/:userId/:isbn')
  async updateSavedBook(
    @Param('userId') userId: number,
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
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.delete(id);
  }
}
