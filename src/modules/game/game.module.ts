import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema, Question, QuestionSchema } from './schemas';
import { GameService, MatchService, QuestionService } from './services';
import { GameController, QuestionController } from './controllers';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [GameController, QuestionController],
  providers: [GameService, QuestionService, MatchService],
})
export class GameModule {}
