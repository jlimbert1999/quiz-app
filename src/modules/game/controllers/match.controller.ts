import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MatchService } from '../services';
import { TransmisionGateway } from 'src/modules/transmision/transmision.gateway';
import { AnswerQuestionDto, CreateMatchDto, GetNextQuestionDto, UpdateMatchDto, UpdateScoreDto } from '../dtos';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService, private transmisionGateway: TransmisionGateway) {}

  @Post()
  match(@Body() data: CreateMatchDto) {
    return this.matchService.create(data);
  }

  @Get()
  findAll() {
    return this.matchService.getPendings();
  }

  @Get('restart')
  restartQuestions() {
    return this.matchService.restartQuestions();
  }

  @Patch('settings/:id')
  updateSettings(@Param('id') id: string, @Body() body: UpdateMatchDto) {
    return this.matchService.updateSettings(id, body);
  }

  @Post('score/:gameId')
  async updateScore(@Param('gameId') id: string, @Body() body: UpdateScoreDto) {
    const result = await this.matchService.updateScore(id, body);
    this.transmisionGateway.announceScore(id, result.score, body.player);
    return result;
  }

  @Get('check/:id')
  getCurrent(@Param('id') id: string) {
    return this.matchService.checkCurrentMatch(id);
  }

  @Get('next/:gameId/:group')
  async getNextQuestion(@Param() params: GetNextQuestionDto) {
    const question = await this.matchService.getRandomQuestion(params);
    this.transmisionGateway.announceQuestion(question, params.gameId);
    return question;
  }

  @Get('show/:gameId')
  async showQuestionOptions(@Param('gameId') gameId: string) {
    const matchStatus = await this.matchService.showQuestionOptions(gameId);
    this.transmisionGateway.announceOptions(gameId);
    return { status: matchStatus };
  }

  @Post('answer')
  async answerQuestion(@Body() data: AnswerQuestionDto) {
    await this.matchService.answerQuestion(data);
    this.transmisionGateway.announceAnswer(data.gameId, data.selectedIndex);
    return { message: 'Pregunta respondida' };
  }
}
