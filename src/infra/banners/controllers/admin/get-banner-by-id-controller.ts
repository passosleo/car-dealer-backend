import { FastifyReply, FastifyRequest } from 'fastify';
import { GetBannerByIdUseCaseFactory } from '../../factories/admin/get-banner-by-id-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class GetBannerByIdController {
  public static async handle(
    req: FastifyRequest<{
      Params: {
        bannerId: string;
      };
    }>,
    res: FastifyReply,
  ) {
    const sut = GetBannerByIdUseCaseFactory.create();
    const response = await sut.execute(req.params.bannerId);
    res.sendResponse(HttpStatus.OK, response);
  }
}
