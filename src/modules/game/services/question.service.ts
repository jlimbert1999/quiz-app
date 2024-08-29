import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateQuestionDto, QuestionOptionDto, UpdateQuestionDto } from '../dtos';
import { FilesService } from 'src/modules/files/files.service';
import { PaginationParamsDto } from 'src/modules/common';
import { Question } from '../schemas';

interface data {
  text: string;
  group: string;
  options: { text: string; isCorrect: boolean }[];
}
@Injectable()
export class QuestionService {
  constructor(@InjectModel(Question.name) private questionModel: Model<Question>, private fileService: FilesService) {}

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
    return { questions: questions.map((question) => this._plainQuestion(question)), length };
  }

  async create(questionDto: CreateQuestionDto) {
    this._checkAnswer(questionDto.options);
    const createdQuestion = new this.questionModel(questionDto);
    await createdQuestion.save();
    return this._plainQuestion(createdQuestion);
  }

  async update(id: string, questionDto: UpdateQuestionDto) {
    const questionDB = await this.questionModel.findById(id);
    if (!questionDB) {
      throw new BadRequestException(`La pregunta ${id} no existe`);
    }
    if (questionDB.options) {
      this._checkAnswer(questionDto.options);
    }
    const updatedQuestion = await this.questionModel.findByIdAndUpdate(id, questionDto, {
      new: true,
    });
    return this._plainQuestion(updatedQuestion);
  }

  async upload(data: data[]) {
    for (const element of data) {
      const createdQuestion = new this.questionModel(element);
      await createdQuestion.save();
    }
    return { message: 'UPLOAD DONE!!' };
  }

  private _checkAnswer(options: QuestionOptionDto[]) {
    const answers = options.filter(({ isCorrect }) => isCorrect);
    if (answers.length > 1 || answers.length === 0) {
      throw new BadRequestException('Las opciones deben tener 1 respuesta');
    }
  }

  private _plainQuestion(question: Question) {
    const { options, imageUrl, ...props} = question.toObject();
    return {
      ...props,
      ...(imageUrl && { imageUrl: this.fileService.buildFileUrl(imageUrl) }),
      options: options.map(({ imageUrl, ...props }) => ({
        ...props,
        ...(imageUrl && { imageUrl: this.fileService.buildFileUrl(imageUrl) }),
      })),
    };
  }
}
