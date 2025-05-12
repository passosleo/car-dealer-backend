import { DeleteUserUseCase } from '../../../../application/users/use-cases/admin/delete-user-use-case';
import { UserRepositoryPrisma } from '../../repositories/user-repository-prisma';

export class DeleteUserUseCaseFactory {
  public static create(): DeleteUserUseCase {
    const userRepository = new UserRepositoryPrisma();
    return new DeleteUserUseCase(userRepository);
  }
}
