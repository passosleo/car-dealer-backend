import { ListSellersUseCase } from '../../../../application/sellers/use-cases/admin/list-sellers-use-case';
import { SellerRepositoryPrisma } from '../../repositories/seller-repository-prisma';

export class ListSellersUseCaseFactory {
  public static create(): ListSellersUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    return new ListSellersUseCase(sellerRepository);
  }
}
