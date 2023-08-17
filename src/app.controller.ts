import { Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get('question/:area')
  async getQuestion(
    @Param('area') area: string
  ) {
    return await this.appService.getQuestion(area);
  }

  @Get('restart')
  async restart() {
    await this.appService.restartQuestions();
    return { message: 'restart completed' }
  }


  @Get('areas')
  async getAreas() {
    return await this.appService.getAreas();
  }

  @Put('question/solve/:id')
  async getNextQuestion(@Param('id') id: string) {
    return await this.appService.solveQuestion(id);
  }
}
