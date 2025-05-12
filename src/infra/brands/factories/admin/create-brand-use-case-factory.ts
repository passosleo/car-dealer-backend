import { CreateBrandUseCase } from '../../../../application/brands/use-cases/admin/create-brand-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { BrandRepositoryPrisma } from '../../repositories/brand-repository-prisma';

export class CreateBrandUseCaseFactory {
  public static create(): CreateBrandUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new CreateBrandUseCase(brandRepository, imageStorage);
  }
}
