import { ICategoryRepository } from '../../../../domain/admin/repositories/category-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(categoryId: string): Promise<void> {
    const categoryExists = await this.categoryRepository.findById(categoryId);
    if (!categoryExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Category not found');
    }
    await this.categoryRepository.delete(categoryId);
  }
}
