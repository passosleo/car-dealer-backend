import { DeleteBrandUseCase } from '../../../../application/admin/brands/use-cases/delete-brand-use-case';
import { BrandRepositoryPrisma } from '../../brands/data/repositories/brand-repository-prisma';

export class DeleteBrandUseCaseFactory {
  public static create(): DeleteBrandUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new DeleteBrandUseCase(brandRepository);
  }
}
