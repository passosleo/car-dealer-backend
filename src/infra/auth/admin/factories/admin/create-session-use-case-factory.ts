import { CreateSessionUseCase } from '../../../../../application/auth/use-cases/admin/create-session-use-case';
import { HashServiceBcryptJS } from '../../../../shared/services/hash-service-bcryptjs';
import { TokenServiceJWT } from '../../../../shared/services/token-service-jwt';
import { UserRepositoryPrisma } from '../../../../users/repositories/user-repository-prisma';

export class CreateSessionUseCaseFactory {
  public static create(): CreateSessionUseCase {
    const userRepository = new UserRepositoryPrisma();
    const tokenService = new TokenServiceJWT();
    const hashService = new HashServiceBcryptJS();
    return new CreateSessionUseCase(userRepository, tokenService, hashService);
  }
}
