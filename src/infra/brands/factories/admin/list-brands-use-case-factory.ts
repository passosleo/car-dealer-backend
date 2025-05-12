import { ListBrandsUseCase } from '../../../../application/brands/use-cases/admin/list-brands-use-case';
import { BrandRepositoryPrisma } from '../../repositories/brand-repository-prisma';

export class ListBrandsUseCaseFactory {
  public static create(): ListBrandsUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new ListBrandsUseCase(brandRepository);
  }
}
