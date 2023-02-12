import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Render('contact')
  @Get()
  createContactForm() {
    return this.contactService.createContactForm();
  }

  @Render('contact')
  @Post()
  createContact(@Body() dto: ContactDto) {
    return this.contactService.createContact(dto);
  }
}
