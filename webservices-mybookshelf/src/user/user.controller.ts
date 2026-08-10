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
}
