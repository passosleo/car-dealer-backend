import { GetSellerByIdUseCase } from '../../../../application/admin/sellers/use-cases/get-seller-by-id-use-case';
import { SellerRepositoryPrisma } from '../../repositories/seller-repository-prisma';

export class GetSellerByIdUseCaseFactory {
  public static create(): GetSellerByIdUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    return new GetSellerByIdUseCase(sellerRepository);
  }
}
