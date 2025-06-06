import { FastifyReply, FastifyRequest } from 'fastify';
import { ListVehiclesRequestDTO } from '../../dtos/admin/list-vehicles-request-dto';
import { ListVehiclesUseCaseFactory } from '../../factories/admin/list-vehicles-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class ListVehiclesController {
  public static async handle(req: FastifyRequest<{ Querystring: ListVehiclesRequestDTO }>, res: FastifyReply) {
    const sut = ListVehiclesUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
