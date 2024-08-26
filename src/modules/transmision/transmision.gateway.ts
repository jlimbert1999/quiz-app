import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { TransmisionService } from './transmision.service';
import { CreateTransmisionDto } from './dto/create-transmision.dto';
import { UpdateTransmisionDto } from './dto/update-transmision.dto';

@WebSocketGateway()
export class TransmisionGateway {
  constructor(private readonly transmisionService: TransmisionService) {}

  @SubscribeMessage('createTransmision')
  create(@MessageBody() createTransmisionDto: CreateTransmisionDto) {
    return this.transmisionService.create(createTransmisionDto);
  }

  @SubscribeMessage('findAllTransmision')
  findAll() {
    return this.transmisionService.findAll();
  }

  @SubscribeMessage('findOneTransmision')
  findOne(@MessageBody() id: number) {
    return this.transmisionService.findOne(id);
  }

  @SubscribeMessage('updateTransmision')
  update(@MessageBody() updateTransmisionDto: UpdateTransmisionDto) {
    return this.transmisionService.update(updateTransmisionDto.id, updateTransmisionDto);
  }

  @SubscribeMessage('removeTransmision')
  remove(@MessageBody() id: number) {
    return this.transmisionService.remove(id);
  }
}
