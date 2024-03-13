import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
