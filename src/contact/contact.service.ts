import { Injectable } from '@nestjs/common';
import { ContactDto } from './dto';

@Injectable()
export class ContactService {
  createContactForm() {
    return { view: 'Contact Form', errors: [] };
  }
  async createContact(dto: ContactDto) {
    return dto;
  }
}
