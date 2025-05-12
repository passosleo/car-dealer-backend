import { FastifyReply, FastifyRequest } from 'fastify';
import { GetVehicleByIdUseCaseFactory } from '../../factories/admin/get-vehicle-by-id-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class GetVehicleByIdController {
  public static async handle(
    req: FastifyRequest<{
      Params: {
        vehicleId: string;
      };
    }>,
    res: FastifyReply,
  ) {
    const sut = GetVehicleByIdUseCaseFactory.create();
    const response = await sut.execute(req.params.vehicleId);
    res.sendResponse(HttpStatus.OK, response);
  }
}
