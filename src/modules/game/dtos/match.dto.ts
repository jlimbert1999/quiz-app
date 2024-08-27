import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class GetNextQuestionDto {
  @IsMongoId()
  gameId: string;

  @IsString()
  @IsNotEmpty()
  group: string;
}
