import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { GameStatus } from '../schemas';

export class PlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  score: number;
}
export class CreateGameDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PlayerDto)
  player1: PlayerDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PlayerDto)
  player2: PlayerDto;
}

export class UpdateGameDto extends PartialType(CreateGameDto) {
  @IsOptional()
  @IsEnum(GameStatus)
  status: GameStatus;
}
