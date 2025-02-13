import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { SendRecoverPasswordRequestDTO } from '../../dtos/auth/send-recover-password-request-dto';
import { SendRecoverPasswordUseCaseFactory } from '../../../factories/auth/send-recover-password-use-case-factory';

export class SendRecoverPasswordController {
  public static async handle(req: FastifyRequest<{ Body: SendRecoverPasswordRequestDTO }>, res: FastifyReply) {
    const sut = SendRecoverPasswordUseCaseFactory.create();
    await sut.execute(SendRecoverPasswordRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK);
  }
}
