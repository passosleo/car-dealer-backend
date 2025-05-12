import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateBannerUseCaseFactory } from '../../factories/admin/update-banner-use-case.factory';
import { UpdateBannerRequestDTO } from '../../dtos/admin/update-banner-request-dto';
import { HttpStatus } from '../../../shared/http/response/http-status';

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
