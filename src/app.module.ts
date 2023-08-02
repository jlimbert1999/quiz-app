import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schemas/quiz.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/quiz-app'),
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
