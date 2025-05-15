import { Seller } from '../../domain/sellers/entities/seller-entity';
import { ISellerRepository, ListSellersParams } from '../../domain/sellers/repositories/seller-repository';
import { Paginated } from '../../infra/shared/types/generic';

export const SellerRepositoryMock: jest.Mocked<ISellerRepository> = {
  create: jest.fn<Promise<Seller>, [Seller]>(),
  update: jest.fn<Promise<Seller>, [string, Partial<Seller>]>(),
  delete: jest.fn<Promise<void>, [string]>(),
  findById: jest.fn<Promise<Seller | null>, [string]>(),
  list: jest.fn<Promise<Paginated<Seller>>, [ListSellersParams]>(),
};
