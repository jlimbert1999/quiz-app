import { PartialType } from '@nestjs/mapped-types';
import { CreateTransmisionDto } from './create-transmision.dto';

export class UpdateTransmisionDto extends PartialType(CreateTransmisionDto) {
  id: number;
}
