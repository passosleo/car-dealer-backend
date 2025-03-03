import { GetSellerByIdUseCase } from '../../../../application/admin/use-cases/sellers/get-seller-by-id-use-case';
import { SellerRepositoryPrisma } from '../../data/repositories/seller-repository-prisma';

export class GetSellerByIdUseCaseFactory {
  public static create(): GetSellerByIdUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    return new GetSellerByIdUseCase(sellerRepository);
  }
}
