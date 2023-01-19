import { Injectable, BadRequestException } from '@nestjs/common';
import { hash } from 'argon2';
import { omit } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signin_get() {
    return { view: 'sign in', dto: {}, errors: [] };
  }

  async signin_post(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    return omit(user, ['password']);
  }

  signup_get() {
    return { view: 'sign up', dto: {}, errors: [] };
  }

  async signup_post(dto: SignupDto) {
    let user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (user) {
      throw new BadRequestException(['user with this email already exist']);
    }

    const hashPassword = await hash(dto.password1);
    user = await this.prisma.user.create({
      data: {
        first: dto.first,
        last: dto.last,
        password: hashPassword,
        email: dto.email,
      },
    });
    return omit(user, ['password']);
  }
}
