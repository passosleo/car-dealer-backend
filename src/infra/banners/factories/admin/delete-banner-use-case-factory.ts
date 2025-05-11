import { DeleteBannerUseCase } from '../../../../application/admin/banners/use-cases/delete-banner-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { BannerRepositoryPrisma } from '../../repositories/banner-repository-prisma';

export class DeleteBannerUseCaseFactory {
  public static create(): DeleteBannerUseCase {
    const bannerRepository = new BannerRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new DeleteBannerUseCase(bannerRepository, imageStorage);
  }
}
