import { DeleteBannerUseCase } from '../../../../application/admin/banners/use-cases/delete-banner-use-case';
import { BannerRepositoryPrisma } from '../data/repositories/banner-repository-prisma';

export class DeleteBannerUseCaseFactory {
  public static create(): DeleteBannerUseCase {
    const bannerRepository = new BannerRepositoryPrisma();
    return new DeleteBannerUseCase(bannerRepository);
  }
}
