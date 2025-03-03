import { GetBrandByIdUseCase } from '../../../../application/admin/brands/use-cases/get-brand-by-id-use-case';
import { BrandRepositoryPrisma } from '../../brands/data/repositories/brand-repository-prisma';

export class GetBrandByIdUseCaseFactory {
  public static create(): GetBrandByIdUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new GetBrandByIdUseCase(brandRepository);
  }
}
