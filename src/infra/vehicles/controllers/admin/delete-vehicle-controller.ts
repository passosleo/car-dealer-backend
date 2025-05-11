import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { DeleteVehicleUseCaseFactory } from '../../factories/admin/delete-vehicle-use-case-factory';

export class DeleteVehicleController {
  public static async handle(req: FastifyRequest<{ Params: { vehicleId: string } }>, res: FastifyReply) {
    const sut = DeleteVehicleUseCaseFactory.create();
    await sut.execute(req.params.vehicleId);
    res.status(HttpStatus.NO_CONTENT.getStatusCode()).send();
  }
}
