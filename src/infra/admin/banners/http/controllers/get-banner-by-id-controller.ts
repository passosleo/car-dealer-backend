import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { GetBrandByIdUseCaseFactory } from '../../../brands/factories/get-brand-by-id-use-case-factory';

export class GetBannerByIdController {
  public static async handle(
    req: FastifyRequest<{
      Params: {
        bannerId: string;
      };
    }>,
    res: FastifyReply,
  ) {
    const sut = GetBrandByIdUseCaseFactory.create();
    const response = await sut.execute(req.params.bannerId);
    res.sendResponse(HttpStatus.OK, response);
  }
}
