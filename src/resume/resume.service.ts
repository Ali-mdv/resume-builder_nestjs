import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { pick } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasicInfoDto, SkillsDto } from './dto';
import { BUSINESSES, LANGUAGES, SKILLS } from './static_data';

@Injectable()
export class ResumeService {
  constructor(private prisma: PrismaService) {}
  async resume(user: User) {
    const basicInfo = await this.prisma.basicInfo.findUnique({
      where: {
        user_id: user.id,
      },
      include: {
        skills: {
          orderBy: {
            score: 'desc',
          },
        },
      },
    });

    return { view: 'resume', basicInfo: basicInfo || {} };
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
      languages: LANGUAGES,
      businesses: BUSINESSES,
      errors: [],
    };
  }

  async basicInfoPost(dto: BasicInfoDto, user: User) {
    const basicInfo = await this.prisma.basicInfo.upsert({
      create: { ...dto, age: Number(dto.age), user_id: user.id },
      update: { ...dto, age: Number(dto.age) },
      where: { user_id: user.id },
    });

    return { view: 'basic_info', dto: basicInfo };
  }

  async skills(id?: string) {
    const locals = {
      view: id ? 'update_skills' : 'create_skills',
      skills: SKILLS,
      errors: [],
      dto: {},
    };
    if (id) {
      const skill = await this.prisma.skill.findUnique({
        where: {
          id: id,
        },
      });
      if (!skill) throw new NotFoundException();
      locals['dto'] = skill;
    }
    return locals;
  }
  async skillsPost(dto: SkillsDto, user: User, id?: string) {
    if (dto.score > 0) {
      if (id) {
        try {
          await this.prisma.skill.update({
            where: {
              id: id,
            },
            data: {
              title: dto.skill,
              score: dto.score,
            },
          });
        } catch (e) {
          throw new NotFoundException();
        }
      } else {
        const basicInfo = await this.prisma.basicInfo.findUnique({
          where: {
            user_id: user.id,
          },
          include: {
            skills: true,
          },
        });

        await this.prisma.skill.create({
          data: {
            title: dto.skill,
            score: dto.score,
            basic_info_id: basicInfo.id,
          },
        });
      }
    } else {
      throw new BadRequestException(['score must number between 1-100']);
    }

    return { view: id ? 'update_skills' : 'create_skills' };
  }

  async skillsDelete(id: string) {
    try {
      await this.prisma.skill.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
    return { view: 'delete_skills' };
  }
}
