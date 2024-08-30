import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Question } from './question.schema';

export enum MatchStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}
@Schema({ _id: false })
class Player extends Document {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({ type: Number, default: 0 })
  score: number;
}
const PlayerSchema = SchemaFactory.createForClass(Player);

@Schema()
export class Game {
  @Prop({
    type: PlayerSchema,
    required: true,
  })
  player1: Player;

  @Prop({
    type: PlayerSchema,
    required: true,
  })
  player2: Player;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Question.name })
  currentQuestion: Question;

  @Prop({ enum: MatchStatus, default: MatchStatus.PENDING })
  status: MatchStatus;
}
export const GameSchema = SchemaFactory.createForClass(Game);
