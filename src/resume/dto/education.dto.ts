import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNotEmpty, MaxLength } from 'class-validator';
import { LEVELS } from '../static_data';

export class EducationDto {
  @MaxLength(40)
  @IsIn(LEVELS, { message: 'level is not valid.' })
  @IsNotEmpty()
  level: string;

  @MaxLength(50)
  @IsNotEmpty()
  field: string;

  @MaxLength(50)
  @IsNotEmpty()
  branch: string;

  @MaxLength(60)
  @IsNotEmpty()
  institute: string;

  @IsDate()
  @Type(() => Date)
  entrance: Date;

  @IsDate()
  @Type(() => Date)
  graduate: Date;
}
