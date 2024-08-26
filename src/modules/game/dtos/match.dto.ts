import { IsMongoId, IsString } from 'class-validator';

export class MatchProps {
  @IsMongoId()
  gameId: string;

  @IsString()
  group: string;
}
