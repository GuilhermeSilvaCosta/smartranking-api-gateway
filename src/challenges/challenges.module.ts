import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
