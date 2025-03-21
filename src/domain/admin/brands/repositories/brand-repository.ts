import { Paginated } from '../../../../infra/shared/types/generic';
import { Brand } from '../entities/brand-entity';

export type ListBrandsParams = {
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

export interface IBrandRepository {
  create(data: Brand): Promise<Brand>;
  update(id: string, data: Partial<Brand>): Promise<Brand>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Brand | null>;
  findByName(name: string): Promise<Brand | null>;
  list(data: ListBrandsParams): Promise<Paginated<Brand>>;
}
