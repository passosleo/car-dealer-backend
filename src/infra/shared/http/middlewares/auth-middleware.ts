import { FastifyRequest, FastifyReply } from 'fastify';
import { TokenServiceJWT } from '../../services/token-service-jwt';
import { HttpException } from '../response/http-exception';
import { HttpStatus } from '../response/http-status';
import { UserRepositoryPrisma } from '../../../users/repositories/user-repository-prisma';
import { UserAccountDTO } from '../../../../domain/users/dtos/user-account-dto';

const tokenService = new TokenServiceJWT();
const userRepository = new UserRepositoryPrisma();

export function authorize(allowedRoles: string[] = []) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ').length !== 2) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];
    const decoded = tokenService.verifyAccessToken<{ id: string }>(token);

    const user = await userRepository.findById(decoded.id);

    if (!user) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid token');
    }

    const userAccount = UserAccountDTO.create(user);

    if (allowedRoles.length > 0 && !userAccount.profile.roles.some((role) => allowedRoles.includes(role.name))) {
      throw new HttpException(HttpStatus.FORBIDDEN, 'User does not have permission to access this resource');
    }

    req.user = userAccount;
  };
}
