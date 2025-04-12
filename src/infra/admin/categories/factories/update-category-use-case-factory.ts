import { UpdateCategoryUseCase } from '../../../../application/admin/categories/use-cases/update-category-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { CategoryRepositoryPrisma } from '../data/repositories/category-repository-prisma';

export class UpdateCategoryUseCaseFactory {
  public static create(): UpdateCategoryUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new UpdateCategoryUseCase(categoryRepository, imageStorage);
  }
}
