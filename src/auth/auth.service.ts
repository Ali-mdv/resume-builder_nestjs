import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signin_get() {
    return { view: 'sign in', dto: {}, errors: [] };
  }

  signin_post() {
    return { view: 'sign in', dto: {} };
  }

  signup_get() {
    return { view: 'sign up', dto: {}, errors: [] };
  }

  async signup_post() {
    return { view: 'sign up', dto: {} };
  }
}
