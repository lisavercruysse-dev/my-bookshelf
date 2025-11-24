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
  UserListResponseDto,
  UserResponseDto,
  UpdateUserRequestDto,
} from './user.dto';
import { ReviewService } from 'src/review/review.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reviewService: ReviewService,
  ) {}

  @Get()
  async getAllUsers(): Promise<UserListResponseDto> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Get(':id/reviews')
  async getReviewsByUserId(@Param('id') id: number) {
    return await this.reviewService.getReviewsByUserId(id);
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.delete(id);
  }
}
