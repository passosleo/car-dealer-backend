import { CreateManyTopBarMessagesUseCase } from '../../../../application/layout/topbar/use-cases/admin/create-many-topbar-messages-use-case';
import { TopBarMessageRepositoryPrisma } from '../repositories/topbar-message-repository-prisma';

export class CreateManyTopBarMessageUseCaseFactory {
  public static create(): CreateManyTopBarMessagesUseCase {
    const topBarMessageRepository = new TopBarMessageRepositoryPrisma();
    return new CreateManyTopBarMessagesUseCase(topBarMessageRepository);
  }
}
