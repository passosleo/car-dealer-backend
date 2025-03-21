import { Paginated } from '../../../../infra/shared/types/generic';
import { Seller } from '../entities/seller-entity';

export type ListSellersParams = {
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

export interface ISellerRepository {
  create(data: Seller): Promise<Seller>;
  update(id: string, data: Partial<Seller>): Promise<Seller>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Seller | null>;
  list(data: ListSellersParams): Promise<Paginated<Seller>>;
}
