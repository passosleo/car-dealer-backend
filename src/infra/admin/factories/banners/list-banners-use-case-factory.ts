import { ListBannersUseCase } from '../../../../application/admin/use-cases/banners/list-banners-use-case';
import { BannerRepositoryPrisma } from '../../data/repositories/banner-repository-prisma';

export class ListBannersUseCaseFactory {
  public static create(): ListBannersUseCase {
    const bannerRepository = new BannerRepositoryPrisma();
    return new ListBannersUseCase(bannerRepository);
  }
}
