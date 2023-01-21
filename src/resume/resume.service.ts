import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { BasicInfoDto } from './dto';

@Injectable()
export class ResumeService {
  resume() {
    return { view: 'resume' };
  }

  basicInfo() {
    return { view: 'basic_info', dto: {}, errors: [] };
  }

  basicInfoPost(dto: BasicInfoDto, user: User) {
    console.log(user);
    return { view: 'basic_info', dto: dto, errors: [] };
  }
}
