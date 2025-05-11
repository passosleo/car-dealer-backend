import { GetBannerByIdUseCase } from '../../../../application/admin/banners/use-cases/get-banner-by-id-use-case';
import { BannerRepositoryPrisma } from '../../repositories/banner-repository-prisma';

export class GetBannerByIdUseCaseFactory {
  public static create(): GetBannerByIdUseCase {
    const bannerRepository = new BannerRepositoryPrisma();
    return new GetBannerByIdUseCase(bannerRepository);
  }
}
