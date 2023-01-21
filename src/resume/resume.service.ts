import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { pick } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasicInfoDto } from './dto';

@Injectable()
export class ResumeService {
  constructor(private prisma: PrismaService) {}
  resume() {
    return { view: 'resume' };
  }

  async basicInfo(user: User) {
    const basicInfo = await this.prisma.basicInfo.findUnique({
      where: {
        user_id: user.id,
      },
    });
    return {
      view: 'basic_info',
      dto: basicInfo || pick(user, ['first', 'last', 'email']),
      errors: [],
    };
  }

  async basicInfoPost(dto: BasicInfoDto, user: User) {
    const basicInfo = await this.prisma.basicInfo.upsert({
      create: { ...dto, age: Number(dto.age), user_id: user.id },
      update: { ...dto, age: Number(dto.age) },
      where: { user_id: user.id },
    });
    console.log(basicInfo);
    return { view: 'basic_info', dto: basicInfo };
  }
}
