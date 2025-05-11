import { DeleteUserUseCase } from '../../../../application/admin/users/use-cases/delete-user-use-case';
import { UserRepositoryPrisma } from '../data/repositories/user-repository-prisma';

export class DeleteUserUseCaseFactory {
  public static create(): DeleteUserUseCase {
    const userRepository = new UserRepositoryPrisma();
    return new DeleteUserUseCase(userRepository);
  }
}
