import { ListCategoriesUseCase } from '../../../../application/categories/use-cases/admin/list-categories-use-case';
import { CategoryRepositoryPrisma } from '../../repositories/category-repository-prisma';

export class ListCategoriesUseCaseFactory {
  public static create(): ListCategoriesUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    return new ListCategoriesUseCase(categoryRepository);
  }
}
