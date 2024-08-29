import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema, Question, QuestionSchema } from './schemas';
import { GameService, MatchService, QuestionService } from './services';
import { GameController, MatchController, QuestionController } from './controllers';
import { TransmisionModule } from '../transmision/transmision.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
    TransmisionModule,
    FilesModule,
  ],
  controllers: [GameController, QuestionController, MatchController],
  providers: [GameService, QuestionService, MatchService],
})
export class GameModule {}
