import { CreateBannerUseCase } from '../../../../application/banners/use-cases/admin/create-banner-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { BannerRepositoryPrisma } from '../../repositories/banner-repository-prisma';

export class CreateBannerUseCaseFactory {
  public static create(): CreateBannerUseCase {
    const bannerRepository = new BannerRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new CreateBannerUseCase(bannerRepository, imageStorage);
  }
}
