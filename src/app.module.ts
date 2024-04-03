import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';
import { ProxyService } from './common/proxy/proxy.service';
import { AwsModule } from './aws/aws.module';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
  imports: [CategoriesModule, PlayersModule, AwsModule, ChallengesModule],
  providers: [ProxyService],
})
export class AppModule {}
