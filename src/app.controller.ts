import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('question')
  async getQuestion() {
    return await this.appService.getQuestion();
  }

  @Get('restart')
  async restart() {
    await this.appService.restartQuestions();
    return { message: 'restart completed' }
  }

  @Get('question/next/:id')
  async getNextQuestion(@Param('id') id: string) {
    return await this.appService.getNextQuestion(id);
  }
}
