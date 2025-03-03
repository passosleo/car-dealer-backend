import { ListSellersUseCase } from '../../../../application/admin/use-cases/sellers/list-sellers-use-case';
import { SellerRepositoryPrisma } from '../../data/repositories/seller-repository-prisma';

export class ListSellersUseCaseFactory {
  public static create(): ListSellersUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    return new ListSellersUseCase(sellerRepository);
  }
}
