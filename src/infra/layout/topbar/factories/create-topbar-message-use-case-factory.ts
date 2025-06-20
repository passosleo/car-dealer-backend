import { CreateTopBarMessageUseCase } from '../../../../application/layout/topbar/use-cases/admin/create-topbar-message-use-case';
import { TopBarMessageRepositoryPrisma } from '../repositories/topbar-message-repository-prisma';

export class CreateTopBarMessageUseCaseFactory {
  public static create(): CreateTopBarMessageUseCase {
    const topBarMessageRepository = new TopBarMessageRepositoryPrisma();
    return new CreateTopBarMessageUseCase(topBarMessageRepository);
  }
}
