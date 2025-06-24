import { UpdateLayoutTopBarConfigUseCase } from '../../../../../application/layout/top-bar/use-cases/admin/update-layout-top-bar-config-use-case';
import { LayoutTopBarConfigRepositoryPrisma } from '../../repositories/layout-top-bar-config-repository-prisma';

export class UpdateLayoutTopBarConfigUseCaseFactory {
  static create(): UpdateLayoutTopBarConfigUseCase {
    const layoutTopBarConfigRepository = new LayoutTopBarConfigRepositoryPrisma();
    return new UpdateLayoutTopBarConfigUseCase(layoutTopBarConfigRepository);
  }
}
