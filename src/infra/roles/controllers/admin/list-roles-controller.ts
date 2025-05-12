import { FastifyReply, FastifyRequest } from 'fastify';
import { ListRolesUseCaseFactory } from '../../factories/admin/list-roles-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class ListRolesController {
  public static async handle(req: FastifyRequest, res: FastifyReply) {
    const sut = ListRolesUseCaseFactory.create();
    const response = await sut.execute();
    res.sendResponse(HttpStatus.OK, response);
  }
}
