import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guard';
import { ResumeService } from './resume.service';
import { BasicInfoDto } from './dto';
import { BadRequestExceptionFilter } from '../auth/exception';

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
  basicInfo() {
    return this.resumeService.basicInfo();
  }

  @Render('resume/basic_info')
  @UseFilters(new BadRequestExceptionFilter())
  @UseGuards(AuthenticatedGuard)
  @Post('basic_info')
  basicInfoPost(@Body() dto: BasicInfoDto) {
    return this.resumeService.basicInfoPost(dto);
  }
}
