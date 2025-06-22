import { Paginated } from '../../../../infra/shared/types/generic';
import { LayoutBannerPosition } from '../entities/layout-banner-position-entity';

export type ListLayoutBannerPositionParams = {
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

export interface ILayoutBannerPositionRepository {
  create(data: LayoutBannerPosition): Promise<LayoutBannerPosition>;
  update(id: string, data: Partial<LayoutBannerPosition>): Promise<LayoutBannerPosition>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<LayoutBannerPosition | null>;
  findAll(): Promise<LayoutBannerPosition[]>;
  list(data: ListLayoutBannerPositionParams): Promise<Paginated<LayoutBannerPosition>>;
}
