import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { ProxyModule } from 'src/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [PlayersController],
})
export class PlayersModule {}
