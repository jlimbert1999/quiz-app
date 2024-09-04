import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Game, MatchStatus, Question, QuestionDocument } from '../schemas';
import { AnswerQuestionDto, CreateMatchDto, GetNextQuestionDto, UpdateMatchDto, UpdateScoreDto } from '../dtos';
import { FilesService } from 'src/modules/files/files.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
    private fileService: FilesService,
  ) {}

  async create(matchDto: CreateMatchDto) {
    const { player1name, player2name } = matchDto;
    const createMatch = new this.gameModel({ player1: { name: player1name }, player2: { name: player2name } });
    return await createMatch.save();
  }

  async getPendings() {
    return this.gameModel.find({ status: MatchStatus.PENDING });
  }

  async updateScore(matchId: string, body: UpdateScoreDto) {
    const { player, operation } = body;
    const match = await this.gameModel.findById(matchId);
    if (!match) throw new BadRequestException(`La partida ${matchId} no existe`);
    const value = operation === 'add' ? match.incrementBy : -match.incrementBy;
    let newScore = 0;
    if (player === 'player1') {
      match.player1.score += value;
      newScore = match.player1.score;
    } else {
      match.player2.score += value;
      newScore = match.player2.score;
    }
    await this.gameModel.updateOne({ _id: matchId }, match);
    return { score: newScore };
  }

  async checkCurrentMatch(id: string) {
    const match = await this.gameModel.findById(id).populate('currentQuestion');
    if (!match) throw new BadRequestException(`La partida ${id} no existe`);
    if (match.currentQuestion) {
      match.currentQuestion = this._plainQuestion(match.currentQuestion);
    }
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
    return this._plainQuestion(question);
  }

  async answerQuestion({ gameId }: AnswerQuestionDto) {
    const match = await this.gameModel.findById(gameId);
    const { currentQuestion } = match;
    if (!currentQuestion) {
      throw new BadRequestException('La partida no tiene una pregunta actual');
    }
    await this.questionModel.updateOne({ _id: currentQuestion._id }, { isActive: false });
  }

  async updateMatch(id: string, matchDto: UpdateMatchDto) {
    return await this.gameModel.findByIdAndUpdate(id, matchDto, { new: true });
  }

  private _plainQuestion(question: Question): Question {
    if (question instanceof Document) {
      question = question.toObject();
    }
    if (question.imageUrl) {
      question.imageUrl = this.fileService.buildFileUrl(question.imageUrl);
    }
    question.options = question.options.map((option) => {
      if (option.imageUrl) {
        option.imageUrl = this.fileService.buildFileUrl(option.imageUrl);
      }
      return option;
    });
    return question;
  }
}
