import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthenticatedGuard } from 'src/auth/guard';
import { ResumeService } from './resume.service';
import {
  BasicInfoDto,
  SkillsDto,
  EducationDto,
  WorkExperienceDto,
} from './dto';
import { getUser } from './decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

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
  @UseInterceptors(
    FileInterceptor('pro_pic', {
      dest: 'public/images/pro_pic',
    }),
  )
  basicInfoPost(
    @Body() dto: BasicInfoDto,
    @getUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.resumeService.basicInfoPost(dto, file, user);
  }

  @Render('resume/skills')
  @Get('skills')
  skillsForm(@getUser() user: User) {
    return this.resumeService.skills(user);
  }

  @Render('resume/skills')
  @Get('skills/:id')
  skillsGet(@getUser() user: User, @Param('id') id: string) {
    return this.resumeService.skills(user, id);
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
  getEducationForm(@getUser() user: User) {
    return this.resumeService.getEducationForm(user);
  }

  @Render('resume/education')
  @Get('education/:id')
  updateEducationForm(@getUser() user: User, @Param('id') id: string) {
    return this.resumeService.getEducationForm(user, id);
  }

  @Redirect('/resume/education')
  @Post('education')
  educationPostCreate(@Body() dto: EducationDto, @getUser() user: User) {
    return this.resumeService.postEducationForm(dto, user);
  }

  @Redirect('/resume')
  @Post('education/:id')
  educationPostUpdate(
    @Body() dto: EducationDto,
    @getUser() user: User,
    @Param('id') id: string,
  ) {
    return this.resumeService.postEducationForm(dto, user, id);
  }

  @Redirect('/resume')
  @Get('education/delete/:id')
  educationDelete(@Param('id') id: string) {
    return this.resumeService.educationDelete(id);
  }

  @Render('resume/work_experience')
  @Get('work_experience')
  getWorkExperienceForm(@getUser() user: User) {
    return this.resumeService.getWorkExperienceForm(user);
  }

  @Render('resume/work_experience')
  @Get('work_experience/:id')
  updateWorkExperienceForm(@getUser() user: User, @Param('id') id: string) {
    return this.resumeService.getWorkExperienceForm(user, id);
  }

  @Redirect('/resume/work_experience')
  @Post('work_experience')
  workExperiencePostCreate(
    @Body() dto: WorkExperienceDto,
    @getUser() user: User,
  ) {
    return this.resumeService.postWorkExperience(dto, user);
  }

  @Redirect('/resume')
  @Post('work_experience/:id')
  workExperiencePostUpdate(
    @Body() dto: WorkExperienceDto,
    @getUser() user: User,
    @Param('id') id: string,
  ) {
    return this.resumeService.postWorkExperience(dto, user, id);
  }

  @Redirect('/resume')
  @Get('work_experience/delete/:id')
  workExperienceDelete(@Param('id') id: string) {
    return this.resumeService.workExperienceDelete(id);
  }
}
