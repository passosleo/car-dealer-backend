import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { ListSellersRequestDTO } from '../../dtos/sellers/list-sellers-request-dto';
import { ListSellersUseCaseFactory } from '../../../factories/sellers/list-sellers-use-case-factory';

export class ListSellersController {
  public static async handle(req: FastifyRequest<{ Querystring: ListSellersRequestDTO }>, res: FastifyReply) {
    const sut = ListSellersUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
