import { DeleteCategoryUseCase } from '../../../../application/admin/use-cases/categories/delete-category-use-case';
import { CategoryRepositoryPrisma } from '../../data/repositories/category-repository-prisma';

export class DeleteCategoryUseCaseFactory {
  public static create(): DeleteCategoryUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    return new DeleteCategoryUseCase(categoryRepository);
  }
}
