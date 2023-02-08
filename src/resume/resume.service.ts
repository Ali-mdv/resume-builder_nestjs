import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Express } from 'express';
import { extname } from 'path';
import { User } from '@prisma/client';
import { pick } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BasicInfoDto,
  SkillsDto,
  EducationDto,
  WorkExperienceDto,
} from './dto';
import { BUSINESSES, LANGUAGES, SKILLS, LEVELS } from './static_data';

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

    const educations = await this.prisma.education.findMany({
      where: {
        user_id: user.id,
      },
    });

    const workExperience = await this.prisma.workExperience.findMany({
      where: {
        user_id: user.id,
      },
    });

    return {
      view: 'resume',
      basicInfo,
      educations,
      workExperience,
      helper: this.DateStingFormat,
    };
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

  async basicInfoPost(
    dto: BasicInfoDto,
    file: Express.Multer.File,
    user: User,
  ) {
    console.log(file);
    const path = file?.path.replace('public', '');
    if (file) {
      if (!['.png', '.jpeg', '.jpg'].includes(extname(file.originalname)))
        throw new BadRequestException(['file type must be image']);
      if (file.size > 1000000)
        throw new BadRequestException(['file size must be less than 1 mg']);
    }
    const basicInfo = await this.prisma.basicInfo.upsert({
      create: { ...dto, age: Number(dto.age), pro_pic: path, user_id: user.id },
      update: { ...dto, age: Number(dto.age), pro_pic: path },
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

        if (!basicInfo)
          throw new BadRequestException([
            'please first compelete your basic info',
          ]);

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

  async getEducationForm(id?: string) {
    const locals = {
      levels: LEVELS,
      dto: {},
      errors: [],
      view: id ? 'Update Education Form' : 'Create Education Form',
    };
    if (id) {
      const education = await this.prisma.education.findUnique({
        where: {
          id: id,
        },
      });
      if (!education) throw new NotFoundException();

      education['newEntrance'] = this.changeDateFormat(education.entrance);
      education['newGraduate'] = this.changeDateFormat(education.graduate);
      locals.dto = education;
    }
    return locals;
  }

  async postEducationForm(dto: EducationDto, user: User, id?: string) {
    if (id) {
      try {
        await this.prisma.education.update({
          where: {
            id: id,
          },
          data: { ...dto },
        });
      } catch (e) {
        throw new NotFoundException();
      }
    } else {
      await this.prisma.education.create({
        data: {
          ...dto,
          user_id: user.id,
        },
      });
    }

    return { view: id ? 'Update Education' : 'Create Education' };
  }

  async educationDelete(id: string) {
    try {
      await this.prisma.education.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
    return { view: 'Delete Education' };
  }

  async getWorkExperienceForm(id?: string) {
    const locals = {
      dto: {},
      errors: [],
      view: id ? 'Update Work Experience Form' : 'Create Work Experience Form',
    };
    if (id) {
      const workExperience = await this.prisma.workExperience.findUnique({
        where: {
          id: id,
        },
      });
      if (!workExperience) throw new NotFoundException();

      workExperience['newStart'] = this.changeDateFormat(workExperience.start);
      if (workExperience.finish) {
        workExperience['newFinish'] = this.changeDateFormat(
          workExperience?.finish,
        );
      }

      locals.dto = workExperience;
    }
    return locals;
  }

  async postWorkExperience(dto: WorkExperienceDto, user: User, id?: string) {
    dto.present ? (dto.finish = null) : (dto.present = false);

    if (id) {
      try {
        await this.prisma.workExperience.update({
          where: {
            id: id,
          },
          data: { ...dto },
        });
      } catch (e) {
        throw new NotFoundException();
      }
    } else {
      await this.prisma.workExperience.create({
        data: { ...dto, user_id: user.id },
      });
    }

    return { view: id ? 'Update Work Experience' : 'Create Work Experience' };
  }

  /**
   * Generates a new format date string for date input html.
   *
   * old '1/29/2022' => new "2022-09-29"
   */
  changeDateFormat(date: Date): string {
    const oldFormat = date.toLocaleDateString().split('/');
    const newFormat = `${String(oldFormat[2]).padStart(2, '0')}-${String(
      oldFormat[0],
    ).padStart(2, '0')}-${String(oldFormat[1]).padStart(2, '0')}`;
    return newFormat;
  }

  async workExperienceDelete(id: string) {
    try {
      await this.prisma.workExperience.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
    return { view: 'Delete Work Experience' };
  }

  /**
   * Generates a new format date string show.
   *
   * date object => new "March 2022"
   */
  DateStingFormat(date: Date): string {
    const monthNames = [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May',
      'June',
      'July',
      'Aug.',
      'Sept.',
      'Oct.',
      'Nov.',
      'Dec.',
    ];

    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }
}
