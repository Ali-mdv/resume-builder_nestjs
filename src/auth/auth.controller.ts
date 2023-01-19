import {
  Controller,
  UseFilters,
  Get,
  Post,
  Body,
  Render,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';
import { BadRequestExceptionFilter } from './exception';

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

  @Redirect('/auth/signin')
  @UseFilters(new BadRequestExceptionFilter())
  @Post('signup')
  signup_post(@Body() dto: SignupDto) {
    return this.authService.signup_post(dto);
  }
}
