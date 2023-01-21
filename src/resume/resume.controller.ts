import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/guard';
import { ResumeService } from './resume.service';
import { BasicInfoDto } from './dto';
import { BadRequestExceptionFilter } from '../auth/exception';
import { getUser } from './decorator';

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Render('resume/index')
  @UseGuards(AuthenticatedGuard)
  @Get()
  resume() {
    return this.resumeService.resume();
  }

  @Render('resume/basic_info')
  @UseGuards(AuthenticatedGuard)
  @Get('basic_info')
  basicInfo(@getUser() user: User) {
    return this.resumeService.basicInfo(user);
  }

  @Redirect('/resume/basic_info')
  @UseFilters(new BadRequestExceptionFilter())
  @UseGuards(AuthenticatedGuard)
  @Post('basic_info')
  basicInfoPost(@Body() dto: BasicInfoDto, @getUser() user: User) {
    return this.resumeService.basicInfoPost(dto, user);
  }
}
