import { GetUserByIdUseCase } from '../../../../application/admin/users/use-cases/get-user-by-id-use-case';
import { UserRepositoryPrisma } from '../data/repositories/user-repository-prisma';

export class GetUserByIdUseCaseFactory {
  public static create(): GetUserByIdUseCase {
    const userRepository = new UserRepositoryPrisma();
    return new GetUserByIdUseCase(userRepository);
  }
}
