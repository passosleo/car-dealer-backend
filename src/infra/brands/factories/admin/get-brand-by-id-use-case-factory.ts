import { GetBrandByIdUseCase } from '../../../../application/brands/use-cases/admin/get-brand-by-id-use-case';
import { BrandRepositoryPrisma } from '../../repositories/brand-repository-prisma';

export class GetBrandByIdUseCaseFactory {
  public static create(): GetBrandByIdUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new GetBrandByIdUseCase(brandRepository);
  }
}
