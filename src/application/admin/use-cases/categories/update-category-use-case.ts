import { ICategoryRepository } from '../../../../domain/admin/repositories/category-repository';
import { CategoryResponseDTO } from '../../../../infra/admin/http/dtos/categories/category-response-dto';
import { UpdateCategoryRequestDTO } from '../../../../infra/admin/http/dtos/categories/update-category-request-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(categoryId: string, data: UpdateCategoryRequestDTO): Promise<CategoryResponseDTO> {
    const categoryExists = await this.categoryRepository.findById(categoryId);
    if (!categoryExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Category not found');
    }
    const categoryWithSameNameExists = await this.categoryRepository.findByName(data.name);
    if (categoryWithSameNameExists && categoryWithSameNameExists.categoryId !== categoryId) {
      throw new HttpException(HttpStatus.CONFLICT, 'Category with same name already exists');
    }
    const category = await this.categoryRepository.update(categoryId, data);
    return CategoryResponseDTO.create(category);
  }
}
