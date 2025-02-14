import { GetUserInfoUseCase } from '../../../../application/admin/use-cases/auth/get-user-info-use-case';
import { AuthProvider } from '../../../../application/shared/providers/auth-provider';
import { UserAccountDTO } from '../../../../domain/admin/dtos/user-account-dto';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';

export class GetUserInfoUseCaseFactory {
  public static create(user: UserAccountDTO): GetUserInfoUseCase {
    const authProvider = new AuthProvider(user);
    const userRepository = new UserRepositoryPrisma();
    return new GetUserInfoUseCase(authProvider, userRepository);
  }
}
