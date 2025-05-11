import { ListUsersUseCase } from '../../../../application/admin/users/use-cases/list-users-use-case';
import { UserRepositoryPrisma } from '../data/repositories/user-repository-prisma';

export class ListUsersUseCaseFactory {
  public static create(): ListUsersUseCase {
    const userRepository = new UserRepositoryPrisma();
    return new ListUsersUseCase(userRepository);
  }
}
