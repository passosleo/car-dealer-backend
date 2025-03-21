import { Paginated } from '../../../../infra/shared/types/generic';
import { Category } from '../entities/category-entity';

export type ListCategoriesParams = {
  page?: number;
  limit?: number;
  orderBy?: 'asc' | 'desc';
  search?: string;
  status?: 'all' | 'active' | 'inactive';
  createdAtStart?: Date;
  createdAtEnd?: Date;
  updatedAtStart?: Date;
  updatedAtEnd?: Date;
};

export interface ICategoryRepository {
  create(data: Category): Promise<Category>;
  update(id: string, data: Partial<Category>): Promise<Category>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  list(data: ListCategoriesParams): Promise<Paginated<Category>>;
}
