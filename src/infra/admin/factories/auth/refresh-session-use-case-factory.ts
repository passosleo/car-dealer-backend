import { RefreshSessionUseCase } from '../../../../application/admin/use-cases/auth/refresh-session-use-case';
import { TokenServiceJWT } from '../../../shared/services/token-service-jwt';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';

export class RefreshSessionUseCaseFactory {
  public static create(): RefreshSessionUseCase {
    const repository = new UserRepositoryPrisma();
    const tokenService = new TokenServiceJWT();
    return new RefreshSessionUseCase(repository, tokenService);
  }
}
