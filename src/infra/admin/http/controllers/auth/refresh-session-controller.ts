import { FastifyReply, FastifyRequest } from 'fastify';
import { RefreshSessionUseCaseFactory } from '../../../factories/auth/refresh-session-use-case-factory';
import { RefreshSessionRequestDTO } from '../../dtos/auth/refresh-session-request-dto';
import { HttpStatus } from '../../../../shared/http/response/http-status';

export class RefreshSessionController {
  public static async handle(req: FastifyRequest<{ Body: RefreshSessionRequestDTO }>, res: FastifyReply) {
    const sut = RefreshSessionUseCaseFactory.create();
    const response = await sut.execute(RefreshSessionRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
