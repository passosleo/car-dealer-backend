import { CreateCategoryUseCase } from '../../../../application/admin/use-cases/categories/create-category-use-case';
import { CategoryRepositoryPrisma } from '../../data/repositories/category-repository-prisma';

export class CreateCategoryUseCaseFactory {
  public static create(): CreateCategoryUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    return new CreateCategoryUseCase(categoryRepository);
  }
}
