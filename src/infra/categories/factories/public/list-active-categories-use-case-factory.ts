import { ListActiveCategoriesUseCase } from '../../../../application/categories/use-cases/public/list-active-categories-use-case';
import { CategoryRepositoryPrisma } from '../../repositories/category-repository-prisma';

export class ListActiveCategoriesUseCaseFactory {
  public static create(): ListActiveCategoriesUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    return new ListActiveCategoriesUseCase(categoryRepository);
  }
}
