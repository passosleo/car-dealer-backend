import { Paginated } from './../../../infra/shared/types/generic.d';
import { IBrandRepository, ListBrandsParams } from '../../../domain/admin/brands/repositories/brand-repository';
import { Brand } from '../../../domain/admin/brands/entities/brand-entity';

export const BrandRepositoryMock: jest.Mocked<IBrandRepository> = {
  create: jest.fn<Promise<Brand>, [Brand]>(),
  update: jest.fn<Promise<Brand>, [string, Partial<Brand>]>(),
  delete: jest.fn<Promise<void>, [string]>(),
  findById: jest.fn<Promise<Brand | null>, [string]>(),
  findByName: jest.fn<Promise<Brand | null>, [string]>(),
  list: jest.fn<Promise<Paginated<Brand>>, [ListBrandsParams]>(),
};
