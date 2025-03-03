import { UpdateCategoryUseCase } from '../../../../application/admin/categories/use-cases/update-category-use-case';
import { CategoryRepositoryPrisma } from '../data/repositories/category-repository-prisma';

export class UpdateCategoryUseCaseFactory {
  public static create(): UpdateCategoryUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    return new UpdateCategoryUseCase(categoryRepository);
  }
}
