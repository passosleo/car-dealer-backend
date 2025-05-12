import { ListBannersUseCase } from '../../../../application/banners/use-cases/admin/list-banners-use-case';
import { BannerRepositoryPrisma } from '../../repositories/banner-repository-prisma';

export class ListBannersUseCaseFactory {
  public static create(): ListBannersUseCase {
    const bannerRepository = new BannerRepositoryPrisma();
    return new ListBannersUseCase(bannerRepository);
  }
}
