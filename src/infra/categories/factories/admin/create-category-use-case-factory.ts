import { CreateCategoryUseCase } from '../../../../application/categories/use-cases/admin/create-category-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { CategoryRepositoryPrisma } from '../../repositories/category-repository-prisma';

export class CreateCategoryUseCaseFactory {
  public static create(): CreateCategoryUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new CreateCategoryUseCase(categoryRepository, imageStorage);
  }
}
