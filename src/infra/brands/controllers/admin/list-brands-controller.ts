import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../shared/http/response/http-status';
import { ListBrandsRequestDTO } from '../../dtos/admin/list-brands-request-dto';
import { ListBrandsUseCaseFactory } from '../../factories/admin/list-brands-use-case-factory';

export class ListBrandsController {
  public static async handle(req: FastifyRequest<{ Querystring: ListBrandsRequestDTO }>, res: FastifyReply) {
    const sut = ListBrandsUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
