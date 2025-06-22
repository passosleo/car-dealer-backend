import { Paginated } from '../../../../infra/shared/types/generic';
import { LayoutTopBarConfig } from '../entities/layout-top-bar-config-entity';

export type ListLayoutTopBarConfigParams = {
  page?: number;
  limit?: number;
  orderBy?: 'asc' | 'desc';
  status?: 'all' | 'active' | 'inactive';
  createdAtStart?: Date;
  createdAtEnd?: Date;
  updatedAtStart?: Date;
  updatedAtEnd?: Date;
};

export interface ILayoutTopBarConfigRepository {
  create(data: LayoutTopBarConfig): Promise<LayoutTopBarConfig>;
  update(id: string, data: Partial<LayoutTopBarConfig>): Promise<LayoutTopBarConfig>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<LayoutTopBarConfig | null>;
  findAll(): Promise<LayoutTopBarConfig[]>;
  list(data: ListLayoutTopBarConfigParams): Promise<Paginated<LayoutTopBarConfig>>;
}
