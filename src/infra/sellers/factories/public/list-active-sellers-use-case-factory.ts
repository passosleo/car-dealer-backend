import { ListActiveSellersUseCase } from '../../../../application/sellers/use-cases/public/list-active-sellers-use-case';
import { SellerRepositoryPrisma } from '../../repositories/seller-repository-prisma';

export class ListActiveSellersUseCaseFactory {
  public static create(): ListActiveSellersUseCase {
    const brandRepository = new SellerRepositoryPrisma();
    return new ListActiveSellersUseCase(brandRepository);
  }
}
