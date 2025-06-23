import { ListLayoutComponentsUseCase } from '../../../../../application/layout/components/use-cases/admin/list-layout-components-use-case';
import { LayoutComponentRepositoryPrisma } from '../../repositories/layout-component-repository-prisma';

export class ListLayoutComponentsUseCaseFactory {
  public static create(): ListLayoutComponentsUseCase {
    const layoutComponentRepository = new LayoutComponentRepositoryPrisma();
    return new ListLayoutComponentsUseCase(layoutComponentRepository);
  }
}
