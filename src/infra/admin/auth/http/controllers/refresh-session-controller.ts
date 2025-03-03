import { FastifyReply, FastifyRequest } from 'fastify';
import { RefreshSessionUseCaseFactory } from '../../../auth/factories/refresh-session-use-case-factory';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { RefreshSessionRequestDTO } from '../dtos/refresh-session-request-dto';

export class RefreshSessionController {
  public static async handle(req: FastifyRequest<{ Body: RefreshSessionRequestDTO }>, res: FastifyReply) {
    const sut = RefreshSessionUseCaseFactory.create();
    const response = await sut.execute(RefreshSessionRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
