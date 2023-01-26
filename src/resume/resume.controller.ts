import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/guard';
import { ResumeService } from './resume.service';
import { BasicInfoDto, SkillsDto } from './dto';
import { BadRequestExceptionFilter } from '../auth/exception';
import { getUser } from './decorator';

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Render('resume/index')
  @UseGuards(AuthenticatedGuard)
  @Get()
  resume(@getUser() user: User) {
    return this.resumeService.resume(user);
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

  @Render('resume/skills')
  @UseGuards(AuthenticatedGuard)
  @Get('skills')
  skillsForm() {
    return this.resumeService.skills();
  }

  @Render('resume/skills')
  @UseGuards(AuthenticatedGuard)
  @Get('skills/:id')
  skillsGet(@Param('id') id: string) {
    return this.resumeService.skills(id);
  }

  @Redirect('/resume/skills')
  @UseFilters(new BadRequestExceptionFilter())
  @UseGuards(AuthenticatedGuard)
  @Post('skills')
  skillsCreate(@Body() dto: SkillsDto, @getUser() user: User) {
    return this.resumeService.skillsPost(dto, user);
  }

  @Redirect('/resume')
  @UseFilters(new BadRequestExceptionFilter())
  @UseGuards(AuthenticatedGuard)
  @Post('skills/:id')
  skillsUpdate(
    @Body() dto: SkillsDto,
    @getUser() user: User,
    @Param('id') id: string,
  ) {
    return this.resumeService.skillsPost(dto, user, id);
  }

  @Redirect('/resume')
  @UseGuards(AuthenticatedGuard)
  @Get('skills/delete/:id')
  skillsDelete(@Param('id') id: string) {
    return this.resumeService.skillsDelete(id);
  }
}
