import { DeleteSellerUseCase } from '../../../../application/sellers/use-cases/admin/delete-seller-use-case';
import { SellerRepositoryPrisma } from '../../repositories/seller-repository-prisma';

export class DeleteSellerUseCaseFactory {
  public static create(): DeleteSellerUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    return new DeleteSellerUseCase(sellerRepository);
  }
}
