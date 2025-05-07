import { ICategoryRepository } from '../../../../domain/admin/categories/repositories/category-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class DeleteCategoryUseCase {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute(categoryId: string): Promise<void> {
    const categoryExists = await this.categoryRepository.findById(categoryId);

    if (!categoryExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Category not found');
    }

    await Promise.all([
      this.categoryRepository.delete(categoryId),
      this.imageStorage.deleteImage(categoryExists.imageUrl),
    ]);
  }
}
