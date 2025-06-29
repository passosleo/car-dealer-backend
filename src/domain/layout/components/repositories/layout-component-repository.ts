import { LayoutComponent } from '@prisma/client';
import { Paginated } from '../../../../infra/shared/types/generic';

export type ListLayoutComponentParams = {
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

export interface ILayoutComponentRepository {
  create(data: LayoutComponent): Promise<LayoutComponent>;
  update(id: string, data: Partial<LayoutComponent>): Promise<LayoutComponent>;
  updateMany(data: Map<string, Partial<LayoutComponent>>): Promise<LayoutComponent[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<LayoutComponent | null>;
  findByIds(ids: string[]): Promise<LayoutComponent[]>;
  findByName(name: string): Promise<LayoutComponent | null>;
  findAll(): Promise<LayoutComponent[]>;
  findAllByPage(page: string): Promise<LayoutComponent[]>;
  list(data: ListLayoutComponentParams): Promise<Paginated<LayoutComponent>>;
}
