import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlayersService } from './players.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  private readonly logger = new Logger(PlayersController.name);

  @Post()
  @UsePipes(ValidationPipe)
  async createOrUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createOrUpdatePlayer(createPlayerDto);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('id') id: string,
  ) {
    return this.playersService.updatePlayer(id, updatePlayerDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async searchPlayers(@Query('email') email: string) {
    return this.playersService.searchPlayers(email);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.playersService.getById(id);
  }

  @Delete('/:id')
  async removePlayer(@Param('id') id: string): Promise<void> {
    return this.playersService.removePlayer(id);
  }

  @Put('/:id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updatePicture(@UploadedFile() file, @Param('id') id: string) {
    return this.playersService.updatePicture(file, id);
  }
}
