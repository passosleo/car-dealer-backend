import { Category } from '../../../../domain/admin/categories/entities/category-entity';
import { ICategoryRepository } from '../../../../domain/admin/categories/repositories/category-repository';
import { CategoryResponseDTO } from '../../../../infra/admin/categories/http/dtos/category-response-dto';
import { CreateCategoryRequestDTO } from '../../../../infra/admin/categories/http/dtos/create-category-request-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(data: CreateCategoryRequestDTO): Promise<CategoryResponseDTO> {
    const categoryExists = await this.categoryRepository.findByName(data.name);
    if (categoryExists) {
      throw new HttpException(HttpStatus.CONFLICT, 'Category already exists');
    }
    const category = await this.categoryRepository.create(Category.create(data));
    return CategoryResponseDTO.create(category);
  }
}
