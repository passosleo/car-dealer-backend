import { CreateBrandUseCase } from '../../../../application/admin/brands/use-cases/create-brand-use-case';
import { BrandRepositoryPrisma } from '../../brands/data/repositories/brand-repository-prisma';

export class CreateBrandUseCaseFactory {
  public static create(): CreateBrandUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new CreateBrandUseCase(brandRepository);
  }
}
