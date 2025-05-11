import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../shared/http/response/http-status';
import { GetBrandByIdUseCaseFactory } from '../../factories/admin/get-brand-by-id-use-case-factory';

export class GetBrandByIdController {
  public static async handle(
    req: FastifyRequest<{
      Params: {
        brandId: string;
      };
    }>,
    res: FastifyReply,
  ) {
    const sut = GetBrandByIdUseCaseFactory.create();
    const response = await sut.execute(req.params.brandId);
    res.sendResponse(HttpStatus.OK, response);
  }
}
