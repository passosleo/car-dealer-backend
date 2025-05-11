import { ListBrandsUseCase } from '../../../../application/admin/brands/use-cases/list-brands-use-case';
import { BrandRepositoryPrisma } from '../../brands/data/repositories/brand-repository-prisma';

export class ListBrandsUseCaseFactory {
  public static create(): ListBrandsUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new ListBrandsUseCase(brandRepository);
  }
}
