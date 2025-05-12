import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteSellerUseCaseFactory } from '../../factories/admin/delete-seller-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class DeleteSellerController {
  public static async handle(req: FastifyRequest<{ Params: { sellerId: string } }>, res: FastifyReply) {
    const sut = DeleteSellerUseCaseFactory.create();
    await sut.execute(req.params.sellerId);
    res.status(HttpStatus.NO_CONTENT.getStatusCode()).send();
  }
}
