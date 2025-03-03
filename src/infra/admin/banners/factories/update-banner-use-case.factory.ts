import { UpdateBannerUseCase } from '../../../../application/admin/banners/use-cases/update-banner-use-case';
import { BannerRepositoryPrisma } from '../data/repositories/banner-repository-prisma';

export class UpdateBannerUseCaseFactory {
  public static create(): UpdateBannerUseCase {
    const bannerRepository = new BannerRepositoryPrisma();
    return new UpdateBannerUseCase(bannerRepository);
  }
}
