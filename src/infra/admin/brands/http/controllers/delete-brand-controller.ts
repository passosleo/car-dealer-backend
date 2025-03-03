import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { DeleteBrandUseCaseFactory } from '../../factories/delete-brand-use-case-factory';

export class DeleteBrandController {
  public static async handle(req: FastifyRequest<{ Params: { brandId: string } }>, res: FastifyReply) {
    const sut = DeleteBrandUseCaseFactory.create();
    await sut.execute(req.params.brandId);
    res.status(HttpStatus.NO_CONTENT.getStatusCode()).send();
  }
}
