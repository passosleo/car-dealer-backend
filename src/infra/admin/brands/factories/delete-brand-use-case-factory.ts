import { DeleteBrandUseCase } from '../../../../application/admin/brands/use-cases/delete-brand-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { BrandRepositoryPrisma } from '../../brands/data/repositories/brand-repository-prisma';

export class DeleteBrandUseCaseFactory {
  public static create(): DeleteBrandUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new DeleteBrandUseCase(brandRepository, imageStorage);
  }
}
