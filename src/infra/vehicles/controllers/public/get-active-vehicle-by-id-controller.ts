import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../shared/http/response/http-status';
import { GetActiveVehicleByIdUseCaseFactory } from '../../factories/public/get-active-vehicle-by-id-use-case-factory';

export class GetActiveVehicleByIdController {
  public static async handle(
    req: FastifyRequest<{
      Params: {
        vehicleId: string;
      };
    }>,
    res: FastifyReply,
  ) {
    const sut = GetActiveVehicleByIdUseCaseFactory.create();
    const response = await sut.execute(req.params.vehicleId);
    res.sendResponse(HttpStatus.OK, response);
  }
}
