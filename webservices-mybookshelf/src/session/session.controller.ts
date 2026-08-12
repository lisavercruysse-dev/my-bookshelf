import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  UseGuards,
  UseInterceptors,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto, LoginResponseDto } from './session.dto';
import { Public } from '../auth/decorators/public.decorator';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { GoogleAuthGuard } from '../auth/guards/google-auth.guard';
import { AuthDelayInterceptor } from '../auth/interceptors/authDelay.interceptor';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  async signIn(
    @Req() req: Request & { user: User },
  ): Promise<LoginResponseDto> {
    const token = await this.authService.login(req.user);
    return { token };
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthCallback(
    @Req()
    req: Request & {
      user: { googleId: string; email?: string; userName?: string };
    },
    @Res() res: Response,
  ) {
    const token = await this.authService.validateOAuthLogin(req.user);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/oauth-callback?token=${token}`);
  }
}
