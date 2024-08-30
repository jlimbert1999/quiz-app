import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MatchService } from '../services';
import { TransmisionGateway } from 'src/modules/transmision/transmision.gateway';
import { AnswerQuestionDto, GetNextQuestionDto } from '../dtos';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService, private transmisionGateway: TransmisionGateway) {}

  @Post('score1/:id')
  async score1(@Param('id') id: string, @Body() data: { score: number }) {
    const result = await this.matchService.addScore1(id, data.score);
    this.transmisionGateway.score1(id, result.score);
    return result;
  }

  @Post('score2/:id')
  async score2(@Param('id') id: string, @Body() data: { score: number }) {
    const result = await this.matchService.addScore2(id, data.score);
    this.transmisionGateway.score2(id, result.score);
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

  @Post('answer')
  async answerQuestion(@Body() data: AnswerQuestionDto) {
    await this.matchService.answerQuestion(data);
    this.transmisionGateway.announceAnswer(data.gameId, data.selectedIndex);
    return { message: 'Pregunta respondida' };
  }
}
