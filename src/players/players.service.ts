import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AwsService } from 'src/aws/aws.service';
import { ProxyService } from 'src/common/proxy/proxy.service';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PlayersService {
  private proxyService: ClientProxy;

  constructor(
    proxyService: ProxyService,
    private readonly awsService: AwsService,
  ) {
    this.proxyService = proxyService.getClientAdmin();
  }

  createOrUpdatePlayer(createPlayerDto: CreatePlayerDto) {
    return this.proxyService.emit('create-player', createPlayerDto);
  }

  updatePlayer(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.proxyService.send('update-player', {
      id,
      player: updatePlayerDto,
    });
  }

  searchPlayers(email: string) {
    return this.proxyService.send('search-players', { email });
  }

  getById(id: string) {
    return this.proxyService.send('get-player', id);
  }

  removePlayer(id: string) {
    this.proxyService.emit('delete-player', id);
  }

  async updatePicture(file: any, id: string) {
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
