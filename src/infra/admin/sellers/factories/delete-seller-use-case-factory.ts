import { DeleteSellerUseCase } from '../../../../application/admin/sellers/use-cases/delete-seller-use-case';
import { SellerRepositoryPrisma } from '../data/repositories/seller-repository-prisma';

export class DeleteSellerUseCaseFactory {
  public static create(): DeleteSellerUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    return new DeleteSellerUseCase(sellerRepository);
  }
}
