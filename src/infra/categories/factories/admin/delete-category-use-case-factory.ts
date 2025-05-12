import { DeleteCategoryUseCase } from '../../../../application/categories/use-cases/admin/delete-category-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { CategoryRepositoryPrisma } from '../../repositories/category-repository-prisma';

export class DeleteCategoryUseCaseFactory {
  public static create(): DeleteCategoryUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new DeleteCategoryUseCase(categoryRepository, imageStorage);
  }
}
