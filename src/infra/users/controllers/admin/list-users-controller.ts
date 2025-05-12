import { FastifyReply, FastifyRequest } from 'fastify';
import { ListUsersRequestDTO } from '../../dtos/admin/list-users-request-dto';
import { ListUsersUseCaseFactory } from '../../factories/admin/list-users-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class ListUsersController {
  public static async handle(req: FastifyRequest<{ Querystring: ListUsersRequestDTO }>, res: FastifyReply) {
    const sut = ListUsersUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
