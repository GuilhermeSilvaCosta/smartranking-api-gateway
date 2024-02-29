import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Observable } from 'rxjs';
import { UpdateCategoryDto } from './dtos/update-category.dto';

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
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.clientAdmin.emit('create-category', createCategoryDto);
  }

  @Get('/categories')
  getCategories(@Query('idCategory') _id: string): Observable<any> {
    return this.clientAdmin.send('get-categories', _id ? _id : '');
  }

  @Get('/categories/:name')
  getCategorieByName(@Param('name') name: string): Observable<any> {
    return this.clientAdmin.send('get-categorie-by-name', name);
  }

  @Put('/categories/:name')
  @UsePipes(ValidationPipe)
  putCategories(
    @Param('name') name: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.clientAdmin.send('put-categories', {
      name,
      category: updateCategoryDto,
    });
  }
}
