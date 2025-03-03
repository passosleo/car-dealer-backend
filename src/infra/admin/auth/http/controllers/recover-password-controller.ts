import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { RecoverPasswordUseCaseFactory } from '../../../auth/factories/recover-password-use-case-factory';
import { RecoverPasswordRequestDTO } from '../dtos/recover-password-request-dto';

export class RecoverPasswordController {
  public static async handle(req: FastifyRequest<{ Body: RecoverPasswordRequestDTO }>, res: FastifyReply) {
    const sut = RecoverPasswordUseCaseFactory.create();
    await sut.execute(RecoverPasswordRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK);
  }
}
