import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Question } from './question.schema';

export enum GameStatus {
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
  })
  player1: Player;

  @Prop({
    type: PlayerSchema,
  })
  player2: Player;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Question.name })
  currentQuestion: Question;

  @Prop({ enum: GameStatus, default: GameStatus.PENDING })
  status: GameStatus;
}
export const GameSchema = SchemaFactory.createForClass(Game);
