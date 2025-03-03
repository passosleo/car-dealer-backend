import { UpdateSellerUseCase } from '../../../../application/admin/sellers/use-cases/update-seller-use-case';
import { SellerRepositoryPrisma } from '../data/repositories/seller-repository-prisma';

export class UpdateSellerUseCaseFactory {
  public static create(): UpdateSellerUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    return new UpdateSellerUseCase(sellerRepository);
  }
}
