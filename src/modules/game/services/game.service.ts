import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Game, GameStatus } from '../schemas';
import { CreateGameDto, UpdateGameDto } from '../dtos';
import { PaginationParamsDto } from 'src/modules/common';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async findAll({ limit, offset }: PaginationParamsDto) {
    const [matches, length] = await Promise.all([
      this.gameModel.find({}).skip(offset).limit(limit).sort({ _id: -1 }),
      this.gameModel.count({}),
    ]);
    return { matches, length };
  }

  async create(gameDto: CreateGameDto) {
    const createdDependency = new this.gameModel(gameDto);
    return await createdDependency.save();
  }

  async update(id: string, gameDto: UpdateGameDto) {
    return await this.gameModel.findByIdAndUpdate(id, gameDto, { new: true });
  }

  async getPendings() {
    return this.gameModel.find({ status: GameStatus.PENDING });
  }

  async getCurrent(id: string) {
    const match = await this.gameModel.findById(id).populate('currentQuestion');
    if (!match) throw new BadRequestException(`La partida ${id} no existe`);
    return match;
  }
}
