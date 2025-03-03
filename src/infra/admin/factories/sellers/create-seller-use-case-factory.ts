import { CreateSellerUseCase } from '../../../../application/admin/use-cases/sellers/create-seller-use-case';
import { SellerRepositoryPrisma } from '../../data/repositories/seller-repository-prisma';

export class CreateSellerUseCaseFactory {
  public static create(): CreateSellerUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    return new CreateSellerUseCase(sellerRepository);
  }
}
