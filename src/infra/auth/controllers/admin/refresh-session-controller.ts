import { FastifyReply, FastifyRequest } from 'fastify';
import { RefreshSessionRequestDTO } from '../../dtos/admin/refresh-session-request-dto';
import { RefreshSessionUseCaseFactory } from '../../factories/admin/refresh-session-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class RefreshSessionController {
  public static async handle(req: FastifyRequest<{ Body: RefreshSessionRequestDTO }>, res: FastifyReply) {
    const sut = RefreshSessionUseCaseFactory.create();
    const response = await sut.execute(RefreshSessionRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
