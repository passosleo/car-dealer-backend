import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { ListActiveBrandsRequestDTO } from '../dtos/list-active-brands-request-dto';
import { ListActiveBrandsUseCaseFactory } from '../../factories/list-active-brands-use-case-factory';

export class ListActiveBrandsController {
  public static async handle(req: FastifyRequest<{ Querystring: ListActiveBrandsRequestDTO }>, res: FastifyReply) {
    const sut = ListActiveBrandsUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
