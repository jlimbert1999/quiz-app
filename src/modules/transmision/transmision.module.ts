import { Module } from '@nestjs/common';
import { TransmisionService } from './transmision.service';
import { TransmisionGateway } from './transmision.gateway';

@Module({
  providers: [TransmisionGateway, TransmisionService],
  exports: [TransmisionGateway],
})
export class TransmisionModule {}
