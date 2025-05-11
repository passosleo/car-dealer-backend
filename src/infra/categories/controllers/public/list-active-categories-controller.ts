import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../shared/http/response/http-status';
import { ListActiveCategoriesRequestDTO } from '../../dtos/public/list-active-categories-request-dto';
import { ListActiveCategoriesUseCaseFactory } from '../../factories/public/list-active-categories-use-case-factory';

export class ListActiveCategoriesController {
  public static async handle(req: FastifyRequest<{ Querystring: ListActiveCategoriesRequestDTO }>, res: FastifyReply) {
    const sut = ListActiveCategoriesUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
