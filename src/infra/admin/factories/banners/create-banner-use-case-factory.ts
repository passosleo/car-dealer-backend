import { CreateBannerUseCase } from '../../../../application/admin/use-cases/banners/create-banner-use-case';
import { BannerRepositoryPrisma } from '../../data/repositories/banner-repository-prisma';

export class CreateBannerUseCaseFactory {
  public static create(): CreateBannerUseCase {
    const bannerRepository = new BannerRepositoryPrisma();
    return new CreateBannerUseCase(bannerRepository);
  }
}
