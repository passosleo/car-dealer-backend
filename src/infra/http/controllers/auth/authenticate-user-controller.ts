import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../response/http-status';
import { AuthenticateUserUseCaseFactory } from '../../../factories/auth/authenticate-user-use-case-factory';
import { AuthenticateUserRequestDTO } from '../../dtos/auth/authenticate-user-request-dto';

export class AuthenticateUserController {
  public static async handle(req: FastifyRequest<{ Body: AuthenticateUserRequestDTO }>, res: FastifyReply) {
    const sut = AuthenticateUserUseCaseFactory.create();
    const response = await sut.execute(AuthenticateUserRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
