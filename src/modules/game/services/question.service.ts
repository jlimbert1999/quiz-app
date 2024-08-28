import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Question } from '../schemas';
import { CreateQuestionDto, QuestionOptionDto, UpdateQuestionDto } from '../dtos';
import { PaginationParamsDto } from 'src/modules/common';

interface data {
  text: string;
  group: string;
  options: { text: string; isCorrect: boolean }[];
}
@Injectable()
export class QuestionService {
  constructor(@InjectModel(Question.name) private questionModel: Model<Question>) {}

  async getGroups() {
    return await this.questionModel.distinct('group');
  }

  async disableQuestion(id: string) {
    await this.questionModel.updateOne({ _id: id }, { isActive: false });
  }

  async findAll({ limit, offset }: PaginationParamsDto) {
    const [questions, length] = await Promise.all([
      this.questionModel.find({}).limit(limit).skip(offset).sort({ _id: -1 }),
      this.questionModel.count(),
    ]);
    return { questions, length };
  }

  async create(questionDto: CreateQuestionDto) {
    this._checkAnswer(questionDto.options);
    const createdQuestion = new this.questionModel(questionDto);
    return await createdQuestion.save();
  }

  async update(id: string, questionDto: UpdateQuestionDto) {
    const questionDB = await this.questionModel.findById(id);
    if (!questionDB) {
      throw new BadRequestException(`La pregunta ${id} no existe`);
    }
    if (questionDB.options) {
      this._checkAnswer(questionDto.options);
    }
    return await this.questionModel.findByIdAndUpdate(id, questionDto, {
      new: true,
    });
  }

  private _checkAnswer(options: QuestionOptionDto[]) {
    const answers = options.filter(({ isCorrect }) => isCorrect);
    if (answers.length > 1 || answers.length === 0) {
      throw new BadRequestException('Las opciones deben tener 1 respuesta');
    }
  }

  
  async upload(data: data[]) {
    for (const element of data) {
      const createdQuestion = new this.questionModel(element);
      await createdQuestion.save();
    }
    return { message: 'UPLOAD DONE!!' };
  }
}
