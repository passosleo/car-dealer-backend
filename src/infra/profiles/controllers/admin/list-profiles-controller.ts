import { FastifyReply, FastifyRequest } from 'fastify';
import { ListProfilesRequestDTO } from '../../dtos/admin/list-profiles-request-dto';
import { ListProfilesUseCaseFactory } from '../../factories/admin/list-profiles-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class ListProfilesController {
  public static async handle(req: FastifyRequest<{ Querystring: ListProfilesRequestDTO }>, res: FastifyReply) {
    const sut = ListProfilesUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
