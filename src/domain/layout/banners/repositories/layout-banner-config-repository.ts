import { Paginated } from '../../../../infra/shared/types/generic';
import { LayoutBannerConfig } from '../entities/layout-banner-config-entity';

export type ListLayoutBannerConfigParams = {
  page?: number;
  limit?: number;
  orderBy?: 'asc' | 'desc';
  status?: 'all' | 'active' | 'inactive';
  createdAtStart?: Date;
  createdAtEnd?: Date;
  updatedAtStart?: Date;
  updatedAtEnd?: Date;
};

export interface ILayoutBannerConfigRepository {
  create(data: LayoutBannerConfig): Promise<LayoutBannerConfig>;
  update(id: string, data: Partial<LayoutBannerConfig>): Promise<LayoutBannerConfig>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<LayoutBannerConfig | null>;
  findAll(): Promise<LayoutBannerConfig[]>;
  list(data: ListLayoutBannerConfigParams): Promise<Paginated<LayoutBannerConfig>>;
}
