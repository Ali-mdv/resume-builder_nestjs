import { Injectable } from '@nestjs/common';
import { BasicInfoDto } from './dto';

@Injectable()
export class ResumeService {
  resume() {
    return { view: 'resume' };
  }

  basicInfo() {
    return { view: 'basic_info', dto: {}, errors: [] };
  }

  basicInfoPost(dto: BasicInfoDto) {
    console.log(dto);
    return { view: 'basic_info', dto: dto, errors: [] };
  }
}
