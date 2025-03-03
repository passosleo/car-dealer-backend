import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { ListBannersRequestDTO } from '../../dtos/banners/list-banners-request-dto';
import { ListBannersUseCaseFactory } from '../../../factories/banners/list-banners-use-case-factory';

export class ListBannersController {
  public static async handle(req: FastifyRequest<{ Querystring: ListBannersRequestDTO }>, res: FastifyReply) {
    const sut = ListBannersUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
