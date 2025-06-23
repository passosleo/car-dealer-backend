import { UpdateLayoutComponentPositionsUseCase } from '../../../../../application/layout/components/use-cases/admin/update-layout-component-positions-use-case';
import { LayoutComponentRepositoryPrisma } from '../../repositories/layout-component-repository-prisma';

export class UpdateLayoutComponentPositionsUseCaseFactory {
  public static create(): UpdateLayoutComponentPositionsUseCase {
    const layoutComponentRepository = new LayoutComponentRepositoryPrisma();
    return new UpdateLayoutComponentPositionsUseCase(layoutComponentRepository);
  }
}
