import { FastifyReply, FastifyRequest } from 'fastify';
import { SendRecoverPasswordRequestDTO } from '../../dtos/admin/send-recover-password-request-dto';
import { SendRecoverPasswordUseCaseFactory } from '../../factories/admin/send-recover-password-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class SendRecoverPasswordController {
  public static async handle(req: FastifyRequest<{ Body: SendRecoverPasswordRequestDTO }>, res: FastifyReply) {
    const sut = SendRecoverPasswordUseCaseFactory.create();
    await sut.execute(SendRecoverPasswordRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK);
  }
}
