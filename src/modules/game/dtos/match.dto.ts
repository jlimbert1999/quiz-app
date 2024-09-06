import { IsIn, IsInt, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

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

export class UpdateScoreDto {
  @IsIn(['player1', 'player2'])
  player: 'player1' | 'player2';

  @IsIn(['add', 'remove'])
  operation: 'add' | 'remove';
}
