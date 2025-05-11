import { ICategoryRepository } from '../../../../domain/categories/repositories/category-repository';
import { ListCategoriesRequestDTO } from '../../../../infra/categories/dtos/admin/list-categories-request-dto';
import { CategoryResponseDTO } from '../../../../infra/categories/dtos/shared/category-response-dto';
import { Paginated } from '../../../../infra/shared/types/generic';

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
