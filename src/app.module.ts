import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GameModule } from './modules/game/game.module';
import { FilesModule } from './modules/files/files.module';
import { TransmisionModule } from './modules/transmision/transmision.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test-quiz'),
    GameModule,
    FilesModule,
    TransmisionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
