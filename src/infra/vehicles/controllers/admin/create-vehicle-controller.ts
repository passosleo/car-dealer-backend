import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateVehicleRequestDTO } from '../../dtos/admin/create-vehicle-request-dto';
import { CreateVehicleUseCaseFactory } from '../../factories/admin/create-vehicle-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class CreateVehicleController {
  public static async handle(req: FastifyRequest<{ Body: CreateVehicleRequestDTO }>, res: FastifyReply) {
    const sut = CreateVehicleUseCaseFactory.create();
    const response = await sut.execute(CreateVehicleRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
