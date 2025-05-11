import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { ListProfilesRequestDTO } from '../../dtos/admin/list-profiles-request-dto';
import { ListProfilesUseCaseFactory } from '../../factories/list-profiles-use-case-factory';

export class ListProfilesController {
  public static async handle(req: FastifyRequest<{ Querystring: ListProfilesRequestDTO }>, res: FastifyReply) {
    const sut = ListProfilesUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
