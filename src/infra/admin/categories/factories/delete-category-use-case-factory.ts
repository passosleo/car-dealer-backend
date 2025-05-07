import { DeleteCategoryUseCase } from '../../../../application/admin/categories/use-cases/delete-category-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { CategoryRepositoryPrisma } from '../data/repositories/category-repository-prisma';

export class DeleteCategoryUseCaseFactory {
  public static create(): DeleteCategoryUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new DeleteCategoryUseCase(categoryRepository, imageStorage);
  }
}
