import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { CategoriesService } from './categories.service';

@Module({
  imports: [ProxyModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
