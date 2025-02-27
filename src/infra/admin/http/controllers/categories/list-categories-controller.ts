import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { ListCategoriesRequestDTO } from '../../dtos/categories/list-categories-request-dto';
import { ListBrandsUseCaseFactory } from '../../../factories/brands/list-brands-use-case-factory';

export class ListCategoriesController {
  public static async handle(req: FastifyRequest<{ Querystring: ListCategoriesRequestDTO }>, res: FastifyReply) {
    const sut = ListBrandsUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
