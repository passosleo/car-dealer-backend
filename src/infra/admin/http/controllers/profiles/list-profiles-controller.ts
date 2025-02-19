import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { ListProfilesUseCaseFactory } from '../../../factories/profiles/list-profiles-use-case-factory';
import { ListProfilesRequestDTO } from '../../dtos/profiles/list-profiles-request-dto';

export class ListProfilesController {
  public static async handle(req: FastifyRequest<{ Querystring: ListProfilesRequestDTO }>, res: FastifyReply) {
    const sut = ListProfilesUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
