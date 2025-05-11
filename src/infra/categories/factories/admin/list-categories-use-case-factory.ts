import { ListCategoriesUseCase } from '../../../../application/admin/categories/use-cases/list-categories-use-case';
import { CategoryRepositoryPrisma } from '../data/repositories/category-repository-prisma';

export class ListCategoriesUseCaseFactory {
  public static create(): ListCategoriesUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    return new ListCategoriesUseCase(categoryRepository);
  }
}
