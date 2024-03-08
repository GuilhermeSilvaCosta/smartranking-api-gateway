import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { ProxyModule } from 'src/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
