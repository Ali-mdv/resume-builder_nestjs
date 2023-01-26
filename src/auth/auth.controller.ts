import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Redirect,
  Render,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard, AnonymousGuard } from './guard';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import {
  BadRequestExceptionFilter,
  UnauthorizedExceptionFilter,
  NotAcceptableExceptionFilter,
} from './exception';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Render('auth/signin')
  @UseGuards(AnonymousGuard)
  @Get('signin')
  signin_get() {
    return this.authService.signin_get();
  }

  // @Redirect('/resume')
  @UseFilters(
    new BadRequestExceptionFilter(),
    new UnauthorizedExceptionFilter(),
    new NotAcceptableExceptionFilter(),
  )
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Body() dto: SigninDto, @Req() req: Request, @Res() res: Response) {
    return this.authService.signin_post(dto, req, res);
  }

  @Redirect('/auth/signin')
  @Get('/logout')
  signout(@Req() req: Request): any {
    return this.authService.signout(req);
  }

  @Render('auth/signup')
  @UseGuards(AnonymousGuard)
  @Get('signup')
  signup_get() {
    return this.authService.signup_get();
  }

  @Redirect('/auth/signin')
  @UseFilters(new BadRequestExceptionFilter())
  @UseGuards(AnonymousGuard)
  @Post('signup')
  signup_post(@Body() dto: SignupDto) {
    return this.authService.signup_post(dto);
  }
}
