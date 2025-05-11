import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { GetSellerByIdUseCaseFactory } from '../../factories/admin/get-seller-by-id-use-case-factory';

export class GetSellerByIdController {
  public static async handle(
    req: FastifyRequest<{
      Params: {
        sellerId: string;
      };
    }>,
    res: FastifyReply,
  ) {
    const sut = GetSellerByIdUseCaseFactory.create();
    const response = await sut.execute(req.params.sellerId);
    res.sendResponse(HttpStatus.OK, response);
  }
}
