import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { AwsModule } from 'src/aws/aws.module';
import { PlayersService } from './players.service';

@Module({
  imports: [ProxyModule, AwsModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
