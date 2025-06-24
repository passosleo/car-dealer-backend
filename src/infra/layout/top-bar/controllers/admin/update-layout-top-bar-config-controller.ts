import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { UpdateLayoutTopBarConfigRequestDTO } from '../../dtos/admin/update-layout-top-bar-config-request-dto';
import { UpdateLayoutTopBarConfigUseCaseFactory } from '../../factories/admin/update-layout-top-bar-config-use-case-factory';

export class UpdateLayoutTopBarConfigController {
  public static async handle(
    req: FastifyRequest<{ Params: { layoutTopBarConfigId: string }; Body: UpdateLayoutTopBarConfigRequestDTO }>,
    res: FastifyReply,
  ) {
    const sut = UpdateLayoutTopBarConfigUseCaseFactory.create();
    const response = await sut.execute(
      req.params.layoutTopBarConfigId,
      UpdateLayoutTopBarConfigRequestDTO.create(req.body),
    );
    res.sendResponse(HttpStatus.OK, response);
  }
}
