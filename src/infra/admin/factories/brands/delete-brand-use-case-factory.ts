import { DeleteBrandUseCase } from '../../../../application/admin/use-cases/brands/delete-brand-use-case';
import { BrandRepositoryPrisma } from '../../data/repositories/brand-repository-prisma';

export class DeleteBrandUseCaseFactory {
  public static create(): DeleteBrandUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new DeleteBrandUseCase(brandRepository);
  }
}
