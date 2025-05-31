import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../shared/http/response/http-status';
import { ListActiveVehiclesRequestDTO } from '../../dtos/public/list-active-vehicles-request-dto';
import { ListActiveVehiclesUseCaseFactory } from '../../factories/public/list-active-vehicles-use-case-factory';

export class ListActiveVehiclesController {
  public static async handle(req: FastifyRequest<{ Querystring: ListActiveVehiclesRequestDTO }>, res: FastifyReply) {
    const sut = ListActiveVehiclesUseCaseFactory.create();
    const response = await sut.execute(req.query);
    res.sendResponse(HttpStatus.OK, response);
  }
}
