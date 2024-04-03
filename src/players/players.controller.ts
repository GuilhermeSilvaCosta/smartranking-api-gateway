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
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProxyService } from 'src/common/proxy/proxy.service';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/aws/aws.service';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api/v1/players')
export class PlayersController {
  private proxyService: ClientProxy;

  constructor(
    proxyService: ProxyService,
    private readonly awsService: AwsService,
  ) {
    this.proxyService = proxyService.getClientAdmin();
  }

  private readonly logger = new Logger(PlayersController.name);

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

  @Put('/:id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updatePicture(@UploadedFile() file, @Param('id') id: string) {
    const player = await firstValueFrom(
      this.proxyService.send('get-player', id),
    );
    const resultUpload = await this.awsService.uploadFile(file, id);

    return this.proxyService.emit('update-player', {
      id,
      player: {
        ...player,
        avatar: resultUpload.url,
      },
    });
  }
}
