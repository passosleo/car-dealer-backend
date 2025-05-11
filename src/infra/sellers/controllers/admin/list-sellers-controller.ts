import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { ListSellersUseCaseFactory } from '../../factories/admin/list-sellers-use-case-factory';
import { ListSellersRequestDTO } from '../../dtos/admin/list-sellers-request-dto';

export class ListSellersController {
  public static async handle(req: FastifyRequest<{ Querystring: ListSellersRequestDTO }>, res: FastifyReply) {
    const sut = ListSellersUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
