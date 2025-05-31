import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../shared/http/response/http-status';
import { ListActiveSellersRequestDTO } from '../../dtos/public/list-active-sellers-request-dto';
import { ListActiveSellersUseCaseFactory } from '../../factories/public/list-active-sellers-use-case-factory';

export class ListActiveSellersController {
  public static async handle(req: FastifyRequest<{ Querystring: ListActiveSellersRequestDTO }>, res: FastifyReply) {
    const sut = ListActiveSellersUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
