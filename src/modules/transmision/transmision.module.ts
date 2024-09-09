import { Module } from '@nestjs/common';
import { TransmisionGateway } from './transmision.gateway';

@Module({
  providers: [TransmisionGateway],
  exports: [TransmisionGateway],
})
export class TransmisionModule {}
