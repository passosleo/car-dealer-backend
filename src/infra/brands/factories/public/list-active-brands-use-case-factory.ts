import { ListActiveBrandsUseCase } from '../../../../application/brands/use-cases/public/list-active-brands-use-case';
import { BrandRepositoryPrisma } from '../../repositories/brand-repository-prisma';

export class ListActiveBrandsUseCaseFactory {
  public static create(): ListActiveBrandsUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new ListActiveBrandsUseCase(brandRepository);
  }
}
