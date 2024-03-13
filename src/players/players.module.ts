import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [ProxyModule, AwsModule],
  controllers: [PlayersController],
})
export class PlayersModule {}
