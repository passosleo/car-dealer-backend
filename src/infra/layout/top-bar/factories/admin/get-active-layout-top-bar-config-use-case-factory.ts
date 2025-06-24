import { GetActiveLayoutTopBarConfigUseCase } from '../../../../../application/layout/top-bar/use-cases/admin/get-active-layout-top-bar-config-use-case';
import { LayoutTopBarConfigRepositoryPrisma } from '../../repositories/layout-top-bar-config-repository-prisma';

export class GetActiveLayoutTopBarConfigUseCaseFactory {
  static create(): GetActiveLayoutTopBarConfigUseCase {
    const layoutTopBarConfigRepository = new LayoutTopBarConfigRepositoryPrisma();
    return new GetActiveLayoutTopBarConfigUseCase(layoutTopBarConfigRepository);
  }
}
