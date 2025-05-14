import { Banner } from '../../domain/banners/entities/banner-entity';
import { IBannerRepository, ListBannersParams } from '../../domain/banners/repositories/banner-repository';
import { Paginated } from '../../infra/shared/types/generic';

export const BannerRepositoryMock: jest.Mocked<IBannerRepository> = {
  create: jest.fn<Promise<Banner>, [Banner]>(),
  update: jest.fn<Promise<Banner>, [string, Partial<Banner>]>(),
  delete: jest.fn<Promise<void>, [string]>(),
  findById: jest.fn<Promise<Banner | null>, [string]>(),
  list: jest.fn<Promise<Paginated<Banner>>, [ListBannersParams]>(),
};
