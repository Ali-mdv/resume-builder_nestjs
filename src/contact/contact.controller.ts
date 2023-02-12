import { Body, Controller, Get, Post, Render, Redirect } from '@nestjs/common';
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

  @Redirect('/contact')
  @Post()
  createContact(@Body() dto: ContactDto) {
    console.log(dto);
    return this.contactService.createContact(dto);
  }
}
