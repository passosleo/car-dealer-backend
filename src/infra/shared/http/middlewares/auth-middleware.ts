import { FastifyRequest, FastifyReply } from 'fastify';
import { TokenServiceJWT } from '../../services/token-service-jwt';
import { HttpException } from '../response/http-exception';
import { HttpStatus } from '../response/http-status';
import { UserRepositoryPrisma } from '../../../admin/data/repositories/user-repository-prisma';
import { UserAccountDTO } from '../../../../domain/admin/dtos/user-account-dto';

const tokenService = new TokenServiceJWT();
const userRepository = new UserRepositoryPrisma();

export function authorize(allowedRoles: string[] = []) {
  console.log('authorize ~ allowedRoles', allowedRoles);
  return async (req: FastifyRequest, res: FastifyReply) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ').length !== 2) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];
    const decoded = tokenService.verifyToken<{ id: string }>(token);

    const user = await userRepository.findById(decoded.id);

    if (!user) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid token');
    }

    req.user = UserAccountDTO.create(user);
  };
}
