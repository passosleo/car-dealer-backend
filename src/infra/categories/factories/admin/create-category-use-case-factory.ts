import { CreateCategoryUseCase } from '../../../../application/admin/categories/use-cases/create-category-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { CategoryRepositoryPrisma } from '../data/repositories/category-repository-prisma';

export class CreateCategoryUseCaseFactory {
  public static create(): CreateCategoryUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new CreateCategoryUseCase(categoryRepository, imageStorage);
  }
}
