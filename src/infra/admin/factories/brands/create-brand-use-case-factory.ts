import { CreateBrandUseCase } from '../../../../application/admin/use-cases/brands/create-brand-use-case';
import { BrandRepositoryPrisma } from '../../data/repositories/brand-repository-prisma';

export class CreateBrandUseCaseFactory {
  public static create(): CreateBrandUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new CreateBrandUseCase(brandRepository);
  }
}
