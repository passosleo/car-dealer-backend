import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { GetActiveLayoutTopBarConfigUseCaseFactory } from '../../factories/admin/get-active-layout-top-bar-config-use-case-factory';

export class GetActiveLayoutTopBarConfigController {
  public static async handle(req: FastifyRequest, res: FastifyReply) {
    const sut = GetActiveLayoutTopBarConfigUseCaseFactory.create();
    const response = await sut.execute();
    res.sendResponse(HttpStatus.OK, response);
  }
}
