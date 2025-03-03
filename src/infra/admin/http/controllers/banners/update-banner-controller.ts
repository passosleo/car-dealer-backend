import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { UpdateBannerRequestDTO } from '../../dtos/banners/update-banner-request-dto';
import { UpdateBannerUseCaseFactory } from '../../../factories/banners/update-banner-use-case.factory';

export class UpdateBannerController {
  public static async handle(
    req: FastifyRequest<{ Params: { bannerId: string }; Body: UpdateBannerRequestDTO }>,
    res: FastifyReply,
  ) {
    const sut = UpdateBannerUseCaseFactory.create();
    const response = await sut.execute(req.params.bannerId, UpdateBannerRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
