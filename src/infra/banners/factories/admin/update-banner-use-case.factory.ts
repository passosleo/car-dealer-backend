import { UpdateBannerUseCase } from '../../../../application/admin/banners/use-cases/update-banner-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { BannerRepositoryPrisma } from '../../repositories/banner-repository-prisma';

export class UpdateBannerUseCaseFactory {
  public static create(): UpdateBannerUseCase {
    const bannerRepository = new BannerRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new UpdateBannerUseCase(bannerRepository, imageStorage);
  }
}
