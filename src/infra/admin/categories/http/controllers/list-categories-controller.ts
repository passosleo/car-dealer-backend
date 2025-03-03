import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { ListCategoriesUseCaseFactory } from '../../factories/list-categories-use-case-factory';
import { ListCategoriesRequestDTO } from '../dtos/list-categories-request-dto';

export class ListCategoriesController {
  public static async handle(req: FastifyRequest<{ Querystring: ListCategoriesRequestDTO }>, res: FastifyReply) {
    const sut = ListCategoriesUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
