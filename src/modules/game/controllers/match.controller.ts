import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MatchService } from '../services';
import { TransmisionGateway } from 'src/modules/transmision/transmision.gateway';
import { AnswerQuestionDto, GetNextQuestionDto } from '../dtos';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService, private transmisionGateway: TransmisionGateway) {}

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
