import { UpdateBrandUseCase } from '../../../../application/brands/use-cases/admin/update-brand-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { BrandRepositoryPrisma } from '../../repositories/brand-repository-prisma';

export class UpdateBrandUseCaseFactory {
  public static create(): UpdateBrandUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new UpdateBrandUseCase(brandRepository, imageStorage);
  }
}
