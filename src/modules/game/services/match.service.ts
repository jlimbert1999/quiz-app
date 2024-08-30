import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, Question, QuestionDocument } from '../schemas';
import { AnswerQuestionDto, GetNextQuestionDto } from '../dtos';
import { FilesService } from 'src/modules/files/files.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
    private fileService: FilesService,
  ) {}

  async addScore1(matchId: string, score: number) {
    const match = await this.gameModel.findById(matchId);
    if (!match) throw new BadRequestException(`La partida ${matchId} no existe`);
    match.player1.score += score;
    await this.gameModel.updateOne({ _id: matchId }, match);
    return { score: match.player1.score };
  }
  async addScore2(matchId: string, score: number) {
    const match = await this.gameModel.findById(matchId);
    if (!match) throw new BadRequestException(`La partida ${matchId} no existe`);
    match.player2.score += score;
    await this.gameModel.updateOne({ _id: matchId }, match);
    return { score: match.player2.score };
  }

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
    question.imageUrl = this.fileService.buildFileUrl(question.imageUrl ?? null);
    question.options = question.options.map((el) => {
      el.imageUrl = this.fileService.buildFileUrl(question.imageUrl ?? null);
      return el;
    });
    return question;
  }

  async answerQuestion({ gameId }: AnswerQuestionDto) {
    const match = await this.gameModel.findById(gameId);
    const { currentQuestion } = match;
    if (!currentQuestion) {
      throw new BadRequestException('La partida no tiene una pregunta actual');
    }
    await this.questionModel.updateMany({ _id: currentQuestion._id }, { isActive: false });
  }

  private _plainQuestion(question: Question) {
    const { options, imageUrl, ...props } = question.toObject();
    return {
      ...props,
      ...(imageUrl && { imageUrl: this.fileService.buildFileUrl(imageUrl) }),
      options: options.map(({ imageUrl, ...props }) => ({
        ...props,
        ...(imageUrl && { imageUrl: this.fileService.buildFileUrl(imageUrl) }),
      })),
    };
  }
}
