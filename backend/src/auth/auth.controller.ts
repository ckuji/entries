import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signIn(signInDto.login, signInDto.password, res);
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  signOut(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}