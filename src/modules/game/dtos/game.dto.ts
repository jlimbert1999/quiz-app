import { PartialType } from '@nestjs/mapped-types';

import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MatchStatus } from '../schemas';
export class CreateMatchDto {
  @IsString()
  @IsNotEmpty()
  player1name: string;

  @IsString()
  @IsNotEmpty()
  player2name: string;
}

export class UpdateGameDto extends PartialType(CreateMatchDto) {
  @IsOptional()
  @IsEnum(MatchStatus)
  status: MatchStatus;
}
