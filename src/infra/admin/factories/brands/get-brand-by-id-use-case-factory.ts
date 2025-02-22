import { GetBrandByIdUseCase } from '../../../../application/admin/use-cases/brands/get-brand-by-id-use-case';
import { BrandRepositoryPrisma } from '../../data/repositories/brand-repository-prisma';

export class GetBrandByIdUseCaseFactory {
  public static create(): GetBrandByIdUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new GetBrandByIdUseCase(brandRepository);
  }
}
