import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto, LoginResponseDto } from './session.dto';
import { Public } from '../auth/decorators/public.decorator';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthDelayInterceptor } from '../auth/interceptors/authDelay.interceptor';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request as ExpressRequest } from 'express';
import { User } from '../types/user';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'Login',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiBody({ type: LoginRequestDto })
  @Post()
  @Public()
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(AuthDelayInterceptor)
  @HttpCode(HttpStatus.OK)
  async signIn(@Request() req: ExpressRequest & { user: User }) {
    const token = await this.authService.login(req.user);
    return { token };
  }
}
