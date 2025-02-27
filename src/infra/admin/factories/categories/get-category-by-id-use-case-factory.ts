import { GetCategoryByIdUseCase } from '../../../../application/admin/use-cases/categories/get-category-by-id-use-case';
import { CategoryRepositoryPrisma } from '../../data/repositories/category-repository-prisma';

export class GetCategoryByIdUseCaseFactory {
  public static create(): GetCategoryByIdUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    return new GetCategoryByIdUseCase(categoryRepository);
  }
}
