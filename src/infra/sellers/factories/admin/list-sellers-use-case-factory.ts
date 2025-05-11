import { ListSellersUseCase } from '../../../../application/admin/sellers/use-cases/list-sellers-use-case';
import { SellerRepositoryPrisma } from '../../repositories/seller-repository-prisma';

export class ListSellersUseCaseFactory {
  public static create(): ListSellersUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    return new ListSellersUseCase(sellerRepository);
  }
}
