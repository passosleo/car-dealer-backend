import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { RecoverPasswordRequestDTO } from '../../dtos/admin/recover-password-request-dto';
import { RecoverPasswordUseCaseFactory } from '../../factories/admin/recover-password-use-case-factory';

export class RecoverPasswordController {
  public static async handle(req: FastifyRequest<{ Body: RecoverPasswordRequestDTO }>, res: FastifyReply) {
    const sut = RecoverPasswordUseCaseFactory.create();
    await sut.execute(RecoverPasswordRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK);
  }
}
