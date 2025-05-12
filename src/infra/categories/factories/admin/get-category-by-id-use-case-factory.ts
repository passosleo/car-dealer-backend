import { GetCategoryByIdUseCase } from '../../../../application/categories/use-cases/admin/get-category-by-id-use-case';
import { CategoryRepositoryPrisma } from '../../repositories/category-repository-prisma';

export class GetCategoryByIdUseCaseFactory {
  public static create(): GetCategoryByIdUseCase {
    const categoryRepository = new CategoryRepositoryPrisma();
    return new GetCategoryByIdUseCase(categoryRepository);
  }
}
