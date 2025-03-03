import { UpdateBrandUseCase } from '../../../../application/admin/brands/use-cases/update-brand-use-case';
import { BrandRepositoryPrisma } from '../../brands/data/repositories/brand-repository-prisma';

export class UpdateBrandUseCaseFactory {
  public static create(): UpdateBrandUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new UpdateBrandUseCase(brandRepository);
  }
}
