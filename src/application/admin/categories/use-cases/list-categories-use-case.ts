import { ListCategoriesRequestDTO } from '../../../../infra/admin/categories/http/dtos/list-categories-request-dto';
import { CategoryResponseDTO } from '../../../../infra/admin/categories/http/dtos/category-response-dto';
import { Paginated } from '../../../../infra/shared/types/generic';
import { ICategoryRepository } from '../../../../domain/admin/categories/repositories/category-repository';

export class ListCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(data: ListCategoriesRequestDTO): Promise<Paginated<CategoryResponseDTO>> {
    const categories = await this.categoryRepository.list(data);
    return {
      ...categories,
      items: categories.items.map(CategoryResponseDTO.create),
    };
  }
}
