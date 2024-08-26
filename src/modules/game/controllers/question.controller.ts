import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationParamsDto } from 'src/modules/common';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto, UpdateQuestionDto } from '../dtos';

@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  @Get()
  findAll(@Query() params: PaginationParamsDto) {
    return this.questionService.findAll(params);
  }

  @Post()
  create(@Body() questionDto: CreateQuestionDto) {
    return this.questionService.create(questionDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() questionDto: UpdateQuestionDto) {
    return this.questionService.update(id, questionDto);
  }

  @Get('groups')
  getGroups() {
    return this.questionService.getGroups();
  }

  @Get('play/:group')
  getRandomQuestion(@Param('group') group: string) {
    return this.questionService.getRandomQuestion(group);
  }
}
