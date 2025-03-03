import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { SendRecoverPasswordUseCaseFactory } from '../../../auth/factories/send-recover-password-use-case-factory';
import { SendRecoverPasswordRequestDTO } from '../dtos/send-recover-password-request-dto';

export class SendRecoverPasswordController {
  public static async handle(req: FastifyRequest<{ Body: SendRecoverPasswordRequestDTO }>, res: FastifyReply) {
    const sut = SendRecoverPasswordUseCaseFactory.create();
    await sut.execute(SendRecoverPasswordRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK);
  }
}
