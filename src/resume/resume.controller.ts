import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/guard';
import { ResumeService } from './resume.service';
import { BasicInfoDto, SkillsDto, EducationDto } from './dto';
import { getUser } from './decorator';

@Controller('resume')
@UseGuards(AuthenticatedGuard)
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Render('resume/index')
  @Get()
  resume(@getUser() user: User) {
    return this.resumeService.resume(user);
  }

  @Render('resume/basic_info')
  @Get('basic_info')
  basicInfo(@getUser() user: User) {
    return this.resumeService.basicInfo(user);
  }

  @Redirect('/resume/basic_info')
  @Post('basic_info')
  basicInfoPost(@Body() dto: BasicInfoDto, @getUser() user: User) {
    return this.resumeService.basicInfoPost(dto, user);
  }

  @Render('resume/skills')
  @Get('skills')
  skillsForm() {
    return this.resumeService.skills();
  }

  @Render('resume/skills')
  @Get('skills/:id')
  skillsGet(@Param('id') id: string) {
    return this.resumeService.skills(id);
  }

  @Redirect('/resume/skills')
  @Post('skills')
  skillsCreate(@Body() dto: SkillsDto, @getUser() user: User) {
    return this.resumeService.skillsPost(dto, user);
  }

  @Redirect('/resume')
  @Post('skills/:id')
  skillsUpdate(
    @Body() dto: SkillsDto,
    @getUser() user: User,
    @Param('id') id: string,
  ) {
    return this.resumeService.skillsPost(dto, user, id);
  }

  @Redirect('/resume')
  @Get('skills/delete/:id')
  skillsDelete(@Param('id') id: string) {
    return this.resumeService.skillsDelete(id);
  }

  @Render('resume/education')
  @Get('education')
  educationGet() {
    return this.resumeService.getEducationForm();
  }

  @Redirect('/resume/education')
  @Post('education')
  educationPost(@Body() dto: EducationDto, @getUser() user: User) {
    return this.resumeService.postEducationForm(dto, user);
  }

  @Redirect('/resume')
  @Get('education/delete/:id')
  educationDelete(@Param('id') id: string) {
    return this.resumeService.educationDelete(id);
  }
}
