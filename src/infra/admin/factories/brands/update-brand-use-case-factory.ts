import { UpdateBrandUseCase } from '../../../../application/admin/use-cases/brands/update-brand-use-case';
import { BrandRepositoryPrisma } from '../../data/repositories/brand-repository-prisma';

export class UpdateBrandUseCaseFactory {
  public static create(): UpdateBrandUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new UpdateBrandUseCase(brandRepository);
  }
}
