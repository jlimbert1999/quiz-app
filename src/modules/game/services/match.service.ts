import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, Question, QuestionDocument } from '../schemas';
import { GetNextQuestionDto } from '../dtos';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async checkCurrentMatch(id: string) {
    const match = await this.gameModel.findById(id).populate('currentQuestion');
    if (!match) throw new BadRequestException(`La partida ${id} no existe`);
    return match;
  }

  async getRandomQuestion({ gameId, group }: GetNextQuestionDto) {
    const [question] = await this.questionModel.aggregate<QuestionDocument>([
      { $match: { isActive: true, group: group } },
      { $sample: { size: 1 } },
    ]);
    if (!question) {
      throw new BadRequestException(`Sin preguntas para el area ${group}`);
    }
    const updatedGame = await this.gameModel.findByIdAndUpdate(gameId, { currentQuestion: question._id });
    if (!updatedGame) throw new BadRequestException(`La partida ${gameId} no existe`);
    return question;
  }

  async answerQuestion(questionId: string) {
    await this.questionModel.findByIdAndUpdate(questionId, { isActive: false });
  }
}
