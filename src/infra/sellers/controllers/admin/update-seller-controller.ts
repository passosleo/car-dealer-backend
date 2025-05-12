import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateSellerUseCaseFactory } from '../../factories/admin/update-seller-use-case-factory';
import { UpdateSellerRequestDTO } from '../../dtos/admin/update-seller-request-dto';
import { HttpStatus } from '../../../shared/http/response/http-status';

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
