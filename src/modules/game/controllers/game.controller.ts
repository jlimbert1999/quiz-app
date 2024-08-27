import {
  Controller,
  Param,
  Patch,
  Query,
  Body,
  Post,
  Get,
} from '@nestjs/common';
import { PaginationParamsDto } from 'src/modules/common';
import { CreateGameDto, UpdateGameDto } from '../dtos';
import { GameService } from '../services';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  findAll(@Query() params: PaginationParamsDto) {
    return this.gameService.findAll(params);
  }

  @Post()
  create(@Body() game: CreateGameDto) {
    return this.gameService.create(game);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() game: UpdateGameDto) {
    return this.gameService.update(id, game);
  }

  @Get('pendings')
  getPendings() {
    return this.gameService.getPendings();
  }

}
