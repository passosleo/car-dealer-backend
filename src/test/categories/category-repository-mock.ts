import { Category } from '../../domain/categories/entities/category-entity';
import { ICategoryRepository, ListCategoriesParams } from '../../domain/categories/repositories/category-repository';
import { Paginated } from '../../infra/shared/types/generic';

export const CategoryRepositoryMock: jest.Mocked<ICategoryRepository> = {
  create: jest.fn<Promise<Category>, [Category]>(),
  update: jest.fn<Promise<Category>, [string, Partial<Category>]>(),
  delete: jest.fn<Promise<void>, [string]>(),
  findById: jest.fn<Promise<Category | null>, [string]>(),
  findByName: jest.fn<Promise<Category | null>, [string]>(),
  list: jest.fn<Promise<Paginated<Category>>, [ListCategoriesParams]>(),
};
