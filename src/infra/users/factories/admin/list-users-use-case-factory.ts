import { ListUsersUseCase } from '../../../../application/users/use-cases/admin/list-users-use-case';
import { UserRepositoryPrisma } from '../../repositories/user-repository-prisma';

export class ListUsersUseCaseFactory {
  public static create(): ListUsersUseCase {
    const userRepository = new UserRepositoryPrisma();
    return new ListUsersUseCase(userRepository);
  }
}
