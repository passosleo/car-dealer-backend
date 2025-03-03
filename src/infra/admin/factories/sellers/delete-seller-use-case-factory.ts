import { DeleteSellerUseCase } from '../../../../application/admin/use-cases/sellers/delete-seller-use-case';
import { SellerRepositoryPrisma } from '../../data/repositories/seller-repository-prisma';

export class DeleteSellerUseCaseFactory {
  public static create(): DeleteSellerUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    return new DeleteSellerUseCase(sellerRepository);
  }
}
