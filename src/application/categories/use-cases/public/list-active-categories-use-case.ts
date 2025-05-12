import { ICategoryRepository } from '../../../../domain/categories/repositories/category-repository';
import { ListActiveCategoriesRequestDTO } from '../../../../infra/categories/dtos/public/list-active-categories-request-dto';
import { CategoryResponseDTO } from '../../../../infra/categories/dtos/shared/category-response-dto';
import { Paginated } from '../../../../infra/shared/types/generic';

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
