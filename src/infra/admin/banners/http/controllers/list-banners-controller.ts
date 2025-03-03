import { FastifyReply, FastifyRequest } from 'fastify';
import { ListBannersRequestDTO } from '../dtos/list-banners-request-dto';
import { ListBannersUseCaseFactory } from '../../factories/list-banners-use-case-factory';
import { HttpStatus } from '../../../../shared/http/response/http-status';

export class ListBannersController {
  public static async handle(req: FastifyRequest<{ Querystring: ListBannersRequestDTO }>, res: FastifyReply) {
    const sut = ListBannersUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
