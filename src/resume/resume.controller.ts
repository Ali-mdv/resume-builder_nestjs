import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guard';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Render('resume/index')
  @UseGuards(AuthenticatedGuard)
  @Get()
  resume() {
    return this.resumeService.resume();
  }
}
