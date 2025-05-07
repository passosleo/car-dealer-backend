import { Paginated } from './../../../infra/shared/types/generic.d';
import {
  ICategoryRepository,
  ListCategoriesParams,
} from '../../../domain/admin/categories/repositories/category-repository';
import { Category } from '@prisma/client';

export const CategoryRepositoryMock: jest.Mocked<ICategoryRepository> = {
  create: jest.fn<Promise<Category>, [Category]>(),
  update: jest.fn<Promise<Category>, [string, Partial<Category>]>(),
  delete: jest.fn<Promise<void>, [string]>(),
  findById: jest.fn<Promise<Category | null>, [string]>(),
  findByName: jest.fn<Promise<Category | null>, [string]>(),
  list: jest.fn<Promise<Paginated<Category>>, [ListCategoriesParams]>(),
};
