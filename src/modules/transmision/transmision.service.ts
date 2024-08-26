import { Injectable } from '@nestjs/common';
import { CreateTransmisionDto } from './dto/create-transmision.dto';
import { UpdateTransmisionDto } from './dto/update-transmision.dto';

@Injectable()
export class TransmisionService {
  create(createTransmisionDto: CreateTransmisionDto) {
    return 'This action adds a new transmision';
  }

  findAll() {
    return `This action returns all transmision`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transmision`;
  }

  update(id: number, updateTransmisionDto: UpdateTransmisionDto) {
    return `This action updates a #${id} transmision`;
  }

  remove(id: number) {
    return `This action removes a #${id} transmision`;
  }
}
