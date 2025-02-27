import { ICategoryRepository } from '../../../../domain/admin/repositories/category-repository';
import { CategoryResponseDTO } from '../../../../infra/admin/http/dtos/categories/category-response-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class GetCategoryByIdUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(brandId: string): Promise<CategoryResponseDTO> {
    const category = await this.categoryRepository.findById(brandId);
    if (!category) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Category not found');
    }
    return CategoryResponseDTO.create(category);
  }
}
