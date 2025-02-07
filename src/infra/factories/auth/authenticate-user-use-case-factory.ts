import { AuthenticateUserUseCase } from '../../../application/use-cases/auth/authenticate-user-use-case';
import { UserRepositoryPrisma } from '../../data/repositories/user-repository-prisma';
import { HashServiceCryptoJS } from '../../services/hash-service-cryptojs';
import { TokenServiceJWT } from '../../services/token-service-jwt';

export class AuthenticateUserUseCaseFactory {
  public static create(): AuthenticateUserUseCase {
    const repository = new UserRepositoryPrisma();
    const tokenService = new TokenServiceJWT();
    const hashService = new HashServiceCryptoJS();
    return new AuthenticateUserUseCase(repository, tokenService, hashService);
  }
}
