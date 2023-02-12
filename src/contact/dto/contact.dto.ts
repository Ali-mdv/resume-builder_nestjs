import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class ContactDto {
  @MaxLength(50)
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(50)
  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  message: string;
}
