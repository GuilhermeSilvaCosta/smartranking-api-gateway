import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProxyService } from 'src/common/proxy/proxy.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
  private proxyService: ClientProxy;
  private rankingProxyService: ClientProxy;

  constructor(proxyService: ProxyService) {
    this.proxyService = proxyService.getClientAdmin();
    this.rankingProxyService = proxyService.getClientRanking();
  }

  createCategory(createCategoryDto: CreateCategoryDto) {
    return this.proxyService.emit('create-category', createCategoryDto);
  }

  getCategories(_id: string) {
    return this.proxyService.send('get-categories', _id ? _id : '');
  }

  getCategorieByName(name: string) {
    return this.proxyService.send('get-categorie-by-name', name);
  }

  putCategories(name: string, updateCategoryDto: UpdateCategoryDto) {
    return this.proxyService.send('put-categories', {
      name,
      category: updateCategoryDto,
    });
  }

  listRanking(id: string, reference: string) {
    return this.rankingProxyService.send('list-rankings', {
      categoryId: id,
      reference,
    });
  }
}
