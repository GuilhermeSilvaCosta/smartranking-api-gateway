import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);

  private clientAdmin: ClientProxy;

  constructor() {
    this.clientAdmin = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost/smartranking'],
        queue: 'admin',
      },
    });
  }

  @Post('/categories')
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.clientAdmin.emit('create-category', createCategoryDto);
  }
}
