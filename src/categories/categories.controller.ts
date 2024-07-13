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
import { CategoriesService } from './categories.service';

@Controller('api/v1/categories')
export class CategoriesController {
  private logger = new Logger(CategoriesController.name);

  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  getCategories(@Query('idCategory') _id: string): Observable<any> {
    return this.categoriesService.getCategories(_id);
  }

  @Get('/:name')
  getCategorieByName(@Param('name') name: string): Observable<any> {
    return this.categoriesService.getCategorieByName(name);
  }

  @Put('/:name')
  @UsePipes(ValidationPipe)
  putCategories(
    @Param('name') name: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.putCategories(name, updateCategoryDto);
  }

  @Get('/:id/rankings')
  listRanking(
    @Param('id') id: string,
    @Query('reference') reference: string,
  ): Observable<any> {
    this.logger.debug(id);
    return this.categoriesService.listRanking(id, reference);
  }
}
