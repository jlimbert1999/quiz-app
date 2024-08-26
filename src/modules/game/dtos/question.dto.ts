import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  ValidateNested,
  ArrayMinSize,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsArray,
} from 'class-validator';

export class QuestionOptionDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  imageUrl?: string;

  @IsBoolean()
  isCorrect: boolean;
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  imageUrl?: string;

  @IsString()
  @IsNotEmpty()
  group: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionDto)
  @ArrayMinSize(2)
  options: QuestionOptionDto[];

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
