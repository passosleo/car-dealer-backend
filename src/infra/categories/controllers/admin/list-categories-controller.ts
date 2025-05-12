import { FastifyReply, FastifyRequest } from 'fastify';
import { ListCategoriesRequestDTO } from '../../dtos/admin/list-categories-request-dto';
import { ListCategoriesUseCaseFactory } from '../../factories/admin/list-categories-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class ListCategoriesController {
  public static async handle(req: FastifyRequest<{ Querystring: ListCategoriesRequestDTO }>, res: FastifyReply) {
    const sut = ListCategoriesUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
