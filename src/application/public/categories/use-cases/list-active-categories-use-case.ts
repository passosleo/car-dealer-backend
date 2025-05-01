import { CategoryResponseDTO } from '../../../../infra/admin/categories/http/dtos/category-response-dto';
import { Paginated } from '../../../../infra/shared/types/generic';
import { ICategoryRepository } from '../../../../domain/admin/categories/repositories/category-repository';
import { ListActiveCategoriesRequestDTO } from '../../../../infra/public/categories/http/dtos/list-active-categories-request-dto';

export class ListActiveCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(data: ListActiveCategoriesRequestDTO): Promise<Paginated<CategoryResponseDTO>> {
    const categories = await this.categoryRepository.list({
      ...data,
      status: 'active',
    });
    return {
      ...categories,
      items: categories.items.map(CategoryResponseDTO.create),
    };
  }
}
