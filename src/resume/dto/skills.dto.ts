import { IsNotEmpty, MaxLength, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SkillsDto {
  @MaxLength(30)
  @IsNotEmpty()
  skill: string;

  @Max(100)
  @Min(0)
  @Type(() => Number)
  @IsNotEmpty()
  score: number;
}
