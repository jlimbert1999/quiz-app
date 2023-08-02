import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz } from './schemas/quiz.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<Quiz>) { }

  async getQuestion() {
    const question = await this.quizModel.aggregate([
      { $match: { isActive: true } },
      { $sample: { size: 1 } },
    ]);
    if (!question[0]) throw new BadRequestException('question no found')
    return question[0]
  }
  async getNextQuestion(currentQuestionId: string) {
    await this.quizModel.findByIdAndUpdate(currentQuestionId, { isActive: false })
    return await this.getQuestion()
  }
  async restartQuestions() {
    await this.quizModel.updateMany({}, { isActive: true })
  }

  getHello(): string {
    return 'Hello World!';
  }
}
