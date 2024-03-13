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
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Observable } from 'rxjs';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { ProxyService } from 'src/common/proxy/proxy.service';

@Controller('api/v1/categories')
export class CategoriesController {
  private logger = new Logger(CategoriesController.name);

  constructor(private readonly proxyService: ProxyService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.proxyService.emit('create-category', createCategoryDto);
  }

  @Get()
  getCategories(@Query('idCategory') _id: string): Observable<any> {
    return this.proxyService.send('get-categories', _id ? _id : '');
  }

  @Get('/:name')
  getCategorieByName(@Param('name') name: string): Observable<any> {
    return this.proxyService.send('get-categorie-by-name', name);
  }

  @Put('/:name')
  @UsePipes(ValidationPipe)
  putCategories(
    @Param('name') name: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.proxyService.send('put-categories', {
      name,
      category: updateCategoryDto,
    });
  }
}
