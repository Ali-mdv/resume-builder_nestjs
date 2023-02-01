import { IsNotEmpty, MaxLength, IsDate, ValidateIf } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class WorkExperienceDto {
  @MaxLength(40)
  @IsNotEmpty()
  job_position: string;

  @MaxLength(50)
  @IsNotEmpty()
  company: string;

  @IsDate()
  @Type(() => Date)
  start: Date;

  @ValidateIf((o) => o.finish.length > 0 || !o.present)
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  finish: Date;

  @ValidateIf((o) => o.present || o.finish.length > 0)
  @Transform(({ value }) => Boolean(value))
  @IsNotEmpty()
  present: boolean;

  @IsNotEmpty()
  job_description: string;
}
