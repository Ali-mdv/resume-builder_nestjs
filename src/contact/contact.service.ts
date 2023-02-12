import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContactDto } from './dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  createContactForm() {
    return { view: 'Contact Form', dto: {}, errors: [] };
  }
  async createContact(dto: ContactDto) {
    const contact = await this.prisma.contact.create({
      data: dto,
    });
    return { view: 'Contact Create', dto: contact, errors: [] };
  }
}
