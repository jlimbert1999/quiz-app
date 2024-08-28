import { Controller, Param, Patch, Body, Get, Post, Query } from '@nestjs/common';

import { PaginationParamsDto } from 'src/modules/common';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto, UpdateQuestionDto } from '../dtos';

@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post('upload')
  upload(@Body() data: any[]) {
    return this.questionService.upload(data);
  }

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
}
