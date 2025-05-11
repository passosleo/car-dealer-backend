import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { RefreshSessionRequestDTO } from '../../dtos/admin/refresh-session-request-dto';
import { RefreshSessionUseCaseFactory } from '../../factories/admin/refresh-session-use-case-factory';

export class RefreshSessionController {
  public static async handle(req: FastifyRequest<{ Body: RefreshSessionRequestDTO }>, res: FastifyReply) {
    const sut = RefreshSessionUseCaseFactory.create();
    const response = await sut.execute(RefreshSessionRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
