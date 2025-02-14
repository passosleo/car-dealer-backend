import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { ListRolesUseCaseFactory } from '../../../factories/role/list-roles-use-case-factory';

export class ListRolesController {
  public static async handle(req: FastifyRequest, res: FastifyReply) {
    const sut = ListRolesUseCaseFactory.create();
    const response = await sut.execute();
    res.sendResponse(HttpStatus.OK, response);
  }
}
