import { GetUserByIdUseCase } from '../../../../application/users/use-cases/admin/get-user-by-id-use-case';
import { UserRepositoryPrisma } from '../../repositories/user-repository-prisma';

export class GetUserByIdUseCaseFactory {
  public static create(): GetUserByIdUseCase {
    const userRepository = new UserRepositoryPrisma();
    return new GetUserByIdUseCase(userRepository);
  }
}
