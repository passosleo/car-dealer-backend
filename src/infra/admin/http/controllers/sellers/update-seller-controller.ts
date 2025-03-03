import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { UpdateSellerRequestDTO } from '../../dtos/sellers/update-sellet-request-dto';
import { UpdateSellerUseCaseFactory } from '../../../factories/sellers/update-seller-use-case-factory';

export class UpdateSellerController {
  public static async handle(
    req: FastifyRequest<{ Params: { sellerId: string }; Body: UpdateSellerRequestDTO }>,
    res: FastifyReply,
  ) {
    const sut = UpdateSellerUseCaseFactory.create();
    const response = await sut.execute(req.params.sellerId, UpdateSellerRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
