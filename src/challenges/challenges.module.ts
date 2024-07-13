import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { ChallengesService } from './challenges.service';

@Module({
  imports: [ProxyModule],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
