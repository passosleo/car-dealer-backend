import { GetSellerByIdUseCase } from '../../../../application/sellers/use-cases/admin/get-seller-by-id-use-case';
import { SellerRepositoryPrisma } from '../../repositories/seller-repository-prisma';

export class GetSellerByIdUseCaseFactory {
  public static create(): GetSellerByIdUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    return new GetSellerByIdUseCase(sellerRepository);
  }
}
