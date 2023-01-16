import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

export class SignupDto {
  @MaxLength(40)
  @IsOptional()
  first: string;

  @MaxLength(40)
  @IsOptional()
  last: string;

  @MaxLength(60)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(6, 60, { message: 'password must be longer than 6 character' })
  @IsNotEmpty()
  password1: string;

  @Length(6, 60, {
    message: 'confirm password must be longer than 6 character',
  })
  @IsNotEmpty()
  password2: string;
}
