import { Injectable } from '@nestjs/common';

@Injectable()
export class ResumeService {
  resume() {
    return { view: 'resume' };
  }
}
