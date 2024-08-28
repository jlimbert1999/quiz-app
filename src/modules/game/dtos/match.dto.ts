import { IsInt, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class GetNextQuestionDto {
  @IsMongoId()
  gameId: string;

  @IsString()
  @IsNotEmpty()
  group: string;
}

export class AnswerQuestionDto {
  @IsMongoId()
  gameId: string;

  @IsInt()
  selectedIndex: number;
}
