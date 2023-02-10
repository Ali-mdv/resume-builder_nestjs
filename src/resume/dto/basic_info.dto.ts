import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BasicInfoDto {
  @MaxLength(40)
  @IsNotEmpty()
  first: string;

  @MaxLength(40)
  @IsNotEmpty()
  last: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @MaxLength(60)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(12)
  @IsPhoneNumber('IR', {
    message: 'phonenumber format is wrong(exm:09121234567)',
  })
  @IsNotEmpty()
  phone: string;

  @MaxLength(100)
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  about: string;

  @IsArray({ message: 'select an option is required.' })
  @IsNotEmpty()
  business: string[];

  @IsArray({ message: 'select an option is required.' })
  @IsNotEmpty()
  language: string[];
}
