import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteBannerUseCaseFactory } from '../../factories/admin/delete-banner-use-case-factory';
import { HttpStatus } from '../../../../shared/http/response/http-status';

export class DeleteBannerController {
  public static async handle(req: FastifyRequest<{ Params: { bannerId: string } }>, res: FastifyReply) {
    const sut = DeleteBannerUseCaseFactory.create();
    await sut.execute(req.params.bannerId);
    res.status(HttpStatus.NO_CONTENT.getStatusCode()).send();
  }
}
