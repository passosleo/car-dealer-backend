import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { ValidateRecoverPasswordRequestUseCaseFactory } from '../../factories/admin/validate-recover-password-request-factory';

export class ValidateRecoverPasswordRequestController {
  public static async handle(req: FastifyRequest<{ Querystring: { token: string } }>, res: FastifyReply) {
    const sut = ValidateRecoverPasswordRequestUseCaseFactory.create();
    await sut.execute(req.query.token);
    res.sendResponse(HttpStatus.OK);
  }
}
