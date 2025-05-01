import { CreateSessionUseCase } from '../../../../application/admin/auth/use-cases/create-session-use-case';
import { HashServiceBcryptJS } from '../../../shared/services/hash-service-bcryptjs';
import { TokenServiceJWT } from '../../../shared/services/token-service-jwt';
import { UserRepositoryPrisma } from '../../users/data/repositories/user-repository-prisma';

export class CreateSessionUseCaseFactory {
  public static create(): CreateSessionUseCase {
    const userRepository = new UserRepositoryPrisma();
    const tokenService = new TokenServiceJWT();
    const hashService = new HashServiceBcryptJS();
    return new CreateSessionUseCase(userRepository, tokenService, hashService);
  }
}
