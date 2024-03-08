import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';
import { ProxyService } from './proxy/proxy.service';

@Module({
  imports: [CategoriesModule, PlayersModule],
  providers: [ProxyService],
})
export class AppModule {}
