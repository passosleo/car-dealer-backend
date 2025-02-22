import { ListBrandsUseCase } from '../../../../application/admin/use-cases/brands/list-brands-use-case';
import { BrandRepositoryPrisma } from '../../data/repositories/brand-repository-prisma';

export class ListBrandsUseCaseFactory {
  public static create(): ListBrandsUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new ListBrandsUseCase(brandRepository);
  }
}
