import { Brand } from '../../domain/brands/entities/brand-entity';
import { IBrandRepository, ListBrandsParams } from '../../domain/brands/repositories/brand-repository';
import { Paginated } from '../../infra/shared/types/generic';

export const BrandRepositoryMock: jest.Mocked<IBrandRepository> = {
  create: jest.fn<Promise<Brand>, [Brand]>(),
  update: jest.fn<Promise<Brand>, [string, Partial<Brand>]>(),
  delete: jest.fn<Promise<void>, [string]>(),
  findById: jest.fn<Promise<Brand | null>, [string]>(),
  findByName: jest.fn<Promise<Brand | null>, [string]>(),
  list: jest.fn<Promise<Paginated<Brand>>, [ListBrandsParams]>(),
};
