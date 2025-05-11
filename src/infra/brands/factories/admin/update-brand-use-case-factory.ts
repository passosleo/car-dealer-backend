import { UpdateBrandUseCase } from '../../../../application/admin/brands/use-cases/update-brand-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { BrandRepositoryPrisma } from '../../brands/data/repositories/brand-repository-prisma';

export class UpdateBrandUseCaseFactory {
  public static create(): UpdateBrandUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new UpdateBrandUseCase(brandRepository, imageStorage);
  }
}
