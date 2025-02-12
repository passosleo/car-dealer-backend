import { CreateSessionUseCase } from '../../../../application/admin/use-cases/auth/create-session-use-case';
import { HashServiceBcrypt } from '../../../shared/services/hash-service-bcrypt';
import { TokenServiceJWT } from '../../../shared/services/token-service-jwt';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';

export class CreateSessionUseCaseFactory {
  public static create(): CreateSessionUseCase {
    const repository = new UserRepositoryPrisma();
    const tokenService = new TokenServiceJWT();
    const hashService = new HashServiceBcrypt();
    return new CreateSessionUseCase(repository, tokenService, hashService);
  }
}
