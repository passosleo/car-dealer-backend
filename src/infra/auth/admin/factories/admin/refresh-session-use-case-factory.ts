import { RefreshSessionUseCase } from '../../../../../application/auth/use-cases/admin/refresh-session-use-case';
import { TokenServiceJWT } from '../../../../shared/services/token-service-jwt';
import { UserRepositoryPrisma } from '../../../../users/repositories/user-repository-prisma';

export class RefreshSessionUseCaseFactory {
  public static create(): RefreshSessionUseCase {
    const userRepository = new UserRepositoryPrisma();
    const tokenService = new TokenServiceJWT();
    return new RefreshSessionUseCase(userRepository, tokenService);
  }
}
