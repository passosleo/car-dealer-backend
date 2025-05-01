import { ListActiveBrandsUseCase } from '../../../../application/public/brands/use-cases/list-active-brands-use-case';
import { BrandRepositoryPrisma } from '../../../admin/brands/data/repositories/brand-repository-prisma';

export class ListActiveBrandsUseCaseFactory {
  public static create(): ListActiveBrandsUseCase {
    const brandRepository = new BrandRepositoryPrisma();
    return new ListActiveBrandsUseCase(brandRepository);
  }
}
