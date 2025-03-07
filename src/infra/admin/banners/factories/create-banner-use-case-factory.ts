import { CreateBannerUseCase } from '../../../../application/admin/banners/use-cases/create-banner-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { BannerRepositoryPrisma } from '../data/repositories/banner-repository-prisma';

export class CreateBannerUseCaseFactory {
  public static create(): CreateBannerUseCase {
    const bannerRepository = new BannerRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new CreateBannerUseCase(bannerRepository, imageStorage);
  }
}
