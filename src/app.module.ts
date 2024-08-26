import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './modules/game/game.module';
import { FilesModule } from './modules/files/files.module';
import { TransmisionModule } from './modules/transmision/transmision.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/quiz-app'),
    GameModule,
    FilesModule,
    TransmisionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
