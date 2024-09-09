import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MatchService } from '../services';
import { TransmisionGateway } from 'src/modules/transmision/transmision.gateway';
import { AnswerQuestionDto, CreateMatchDto, GetNextQuestionDto, UpdateMatchDto, UpdateScoreDto } from '../dtos';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService, private transmisionGateway: TransmisionGateway) {}

  @Get('check')
  checkCurrentMatch() {
    return this.matchService.checkCurrentMatch();
  }

  @Get('result/:id')
  getMatchResult(@Param('id') id: string) {
    return this.matchService.getMatchResult(id);
  }

  @Post()
  async create(@Body() data: CreateMatchDto) {
    const match = await this.matchService.create(data);
    this.transmisionGateway.announceNewMatch();
    return match;
  }

  @Get('restart')
  restartQuestions() {
    return this.matchService.restartQuestions();
  }

  @Patch(':id')
  async updateMatchSettings(@Param('id') id: string, @Body() body: UpdateMatchDto) {
    const result = await this.matchService.updateMatchSettings(id, body);
    this.transmisionGateway.announceSettings(result.incrementBy, result.timer);
    return result;
  }

  @Delete(':id')
  async endMatch(@Param('id') id: string) {
    const result = await this.matchService.endMatch(id);
    this.transmisionGateway.announceWinner();
    return result;
  }

  @Post('score/:gameId')
  async updateScore(@Param('gameId') id: string, @Body() body: UpdateScoreDto) {
    const result = await this.matchService.updateScore(id, body);
    this.transmisionGateway.announceScore(result.score, body.player);
    return result;
  }

  @Get('next/:gameId/:group')
  async getNextQuestion(@Param() params: GetNextQuestionDto) {
    const question = await this.matchService.getRandomQuestion(params);
    this.transmisionGateway.announceQuestion(question);
    return question;
  }

  @Get('show/:gameId')
  async showQuestionOptions(@Param('gameId') gameId: string) {
    const matchStatus = await this.matchService.showQuestionOptions(gameId);
    this.transmisionGateway.announceOptions();
    return { status: matchStatus };
  }

  @Post('answer')
  async answerQuestion(@Body() data: AnswerQuestionDto) {
    await this.matchService.answerQuestion(data);
    this.transmisionGateway.announceAnswer(data.selectedIndex);
    return { message: 'Pregunta respondida' };
  }
}
