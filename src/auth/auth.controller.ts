import { Controller, Get, Post, Render, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Render('auth/signin')
  @Get('signin')
  signin_get() {
    return this.authService.signin_get();
  }

  @Redirect('/resume')
  @Post('signin')
  signin() {
    return this.authService.signin_post();
  }

  @Render('auth/signup')
  @Get('signup')
  signup_get() {
    return this.authService.signup_get();
  }

  @Redirect('/resume')
  @Post('signup')
  signup_post() {
    return this.authService.signup_post();
  }
}
