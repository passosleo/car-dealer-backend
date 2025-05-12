import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateBannerUseCaseFactory } from '../../factories/admin/create-banner-use-case-factory';
import { CreateBannerRequestDTO } from '../../dtos/admin/create-banner-request-dto';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class CreateBannerController {
  public static async handle(req: FastifyRequest<{ Body: CreateBannerRequestDTO }>, res: FastifyReply) {
    const sut = CreateBannerUseCaseFactory.create();
    const response = await sut.execute(CreateBannerRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
