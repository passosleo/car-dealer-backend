import { Paginated } from '../../../../infra/shared/types/generic';
import { Banner } from '../entities/banner-entity';

export type ListBannersParams = {
  page?: number;
  limit?: number;
  orderBy?: 'asc' | 'desc';
  search?: string;
  active?: 'all' | 'active' | 'inactive';
  startAtStart?: Date;
  startAtEnd?: Date;
  endAtStart?: Date;
  endAtEnd?: Date;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  updatedAtStart?: Date;
  updatedAtEnd?: Date;
};

export interface IBannerRepository {
  create(data: Banner): Promise<Banner>;
  update(id: string, data: Partial<Banner>): Promise<Banner>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Banner | null>;
  list(data: ListBannersParams): Promise<Paginated<Banner>>;
}
