import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../response/http-status';
import { HttpException } from '../../response/http-exception';
import { AuthenticateUserUseCaseFactory } from '../../../factories/auth/authenticate-user-use-case-factory';
import { AuthenticateUserRequestDTO } from '../../dtos/auth/authenticate-user-request-dto';

export class AuthenticateUserController {
  public static async handle(req: FastifyRequest<{ Body: AuthenticateUserRequestDTO }>, res: FastifyReply) {
    try {
      const sut = AuthenticateUserUseCaseFactory.create();
      const response = await sut.execute(AuthenticateUserRequestDTO.create(req.body));
      res.sendResponse(HttpStatus.OK, response);
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        res.sendResponse(e.statusCode, {
          error: e.message,
        });
      } else {
        res.sendResponse(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
