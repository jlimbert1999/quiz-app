import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { MatchStatus } from '../schemas';
export class CreateMatchDto {
  @IsString()
  @IsNotEmpty()
  player1name: string;

  @IsString()
  @IsNotEmpty()
  player2name: string;
}

export class UpdateMatchDto {
  @IsOptional()
  @IsEnum(MatchStatus)
  status: MatchStatus;

  @IsInt()
  @Min(1)
  incrementBy: number;

  @IsInt()
  @Min(1)
  timer: number;
}
