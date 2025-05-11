import { ListActiveCategoriesUseCase } from '../../../../application/public/categories/use-cases/list-active-categories-use-case';
import { CategoryRepositoryPrisma } from '../../../admin/categories/data/repositories/category-repository-prisma';

export class ListActiveCategoriesUseCaseFactory {
  public static create(): ListActiveCategoriesUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    return new ListActiveCategoriesUseCase(categoryRepository);
  }
}
