import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProxyService } from 'src/proxy/proxy.service';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createOrUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.proxyService.emit('create-player', createPlayerDto);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('id') id: string,
  ) {
    return this.proxyService.send('update-player', {
      id,
      player: updatePlayerDto,
    });
  }

  @Get()
  async searchPlayers(@Query('email') email: string) {
    return this.proxyService.send('search-players', { email });
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.proxyService.send('get-player', id);
  }

  @Delete('/:id')
  async removePlayer(@Param('id') id: string): Promise<void> {
    this.proxyService.emit('delete-player', id);
  }
}
