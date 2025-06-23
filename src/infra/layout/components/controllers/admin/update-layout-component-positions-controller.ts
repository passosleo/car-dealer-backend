import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { UpdateLayoutComponentPositionsUseCaseFactory } from '../../factories/admin/update-layout-component-positions-use-case-factory';
import { UpdateLayoutComponentPositionsRequestDTO } from '../../dtos/admin/update-layout-component-positions-dto';

export class UpdateLayoutComponentPositionsController {
  public static async handle(
    req: FastifyRequest<{ Params: { page: string }; Body: UpdateLayoutComponentPositionsRequestDTO[] }>,
    res: FastifyReply,
  ) {
    const sut = UpdateLayoutComponentPositionsUseCaseFactory.create();
    const response = await sut.execute(req.params.page, req.body.map(UpdateLayoutComponentPositionsRequestDTO.create));
    res.sendResponse(HttpStatus.OK, response);
  }
}
