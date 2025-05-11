import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { UpdateVehicleRequestDTO } from '../../dtos/admin/update-vehicle-request-dto';
import { UpdateVehicleUseCaseFactory } from '../../factories/admin/update-vehicle-use-case-factory';

export class UpdateVehicleController {
  public static async handle(
    req: FastifyRequest<{ Params: { vehicleId: string }; Body: UpdateVehicleRequestDTO }>,
    res: FastifyReply,
  ) {
    const sut = UpdateVehicleUseCaseFactory.create();
    const response = await sut.execute(req.params.vehicleId, UpdateVehicleRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
