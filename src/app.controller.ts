import { Controller, Get, Param } from '@nestjs/common';
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



  @Get('question/next/:id/:area')
  async getNextQuestion(@Param('id') id: string, @Param('area') area: string) {
    return await this.appService.getNextQuestion(id, area);
  }
}
