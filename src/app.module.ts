import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GameModule } from './modules/game/game.module';
import { FilesModule } from './modules/files/files.module';
import { TransmisionModule } from './modules/transmision/transmision.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/quiz-app'),
    GameModule,
    FilesModule,
    TransmisionModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
