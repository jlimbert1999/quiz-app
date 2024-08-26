import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, Question } from '../schemas';
import { MatchProps } from '../dtos';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async getRandomQuestion({ gameId, group }: MatchProps) {
    const [question] = await this.questionModel.aggregate([
      { $match: { isActive: true, group: group } },
      { $sample: { size: 1 } },
    ]);
    if (!question) {
      throw new BadRequestException(`Sin preguntas para el area ${group}`);
    }
    // await this.gameModel.updateOne(gameId, {
    //   currentQuestion: question._id,
    // });
    return question;
  }
}
