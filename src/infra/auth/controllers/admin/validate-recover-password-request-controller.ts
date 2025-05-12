import { FastifyReply, FastifyRequest } from 'fastify';
import { ValidateRecoverPasswordRequestUseCaseFactory } from '../../factories/admin/validate-recover-password-request-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class ValidateRecoverPasswordRequestController {
  public static async handle(req: FastifyRequest<{ Querystring: { token: string } }>, res: FastifyReply) {
    const sut = ValidateRecoverPasswordRequestUseCaseFactory.create();
    await sut.execute(req.query.token);
    res.sendResponse(HttpStatus.OK);
  }
}
