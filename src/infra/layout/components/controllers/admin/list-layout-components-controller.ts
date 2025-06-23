import { FastifyReply, FastifyRequest } from 'fastify';
import { ListLayoutComponentsUseCaseFactory } from '../../factories/admin/list-layout-components-use-case-factory';
import { HttpStatus } from '../../../../shared/http/response/http-status';

export class ListLayoutComponentsController {
  public static async handle(req: FastifyRequest, res: FastifyReply) {
    const sut = ListLayoutComponentsUseCaseFactory.create();
    const response = await sut.execute();
    res.sendResponse(HttpStatus.OK, response);
  }
}
