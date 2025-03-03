import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { CreateBannerRequestDTO } from '../../dtos/banners/create-banner-request-dto';
import { CreateBannerUseCaseFactory } from '../../../factories/banners/create-banner-use-case-factory';

export class CreateBannerController {
  public static async handle(req: FastifyRequest<{ Body: CreateBannerRequestDTO }>, res: FastifyReply) {
    const sut = CreateBannerUseCaseFactory.create();
    const response = await sut.execute(CreateBannerRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
