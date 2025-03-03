import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { UpdateBrandRequestDTO } from '../dtos/update-brand-request-dto';
import { UpdateBrandUseCaseFactory } from '../../factories/update-brand-use-case-factory';

export class UpdateBrandController {
  public static async handle(
    req: FastifyRequest<{ Params: { brandId: string }; Body: UpdateBrandRequestDTO }>,
    res: FastifyReply,
  ) {
    const sut = UpdateBrandUseCaseFactory.create();
    const response = await sut.execute(req.params.brandId, UpdateBrandRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
