import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { CreateSellerUseCaseFactory } from '../../factories/admin/create-seller-use-case-factory';
import { CreateSellerRequestDTO } from '../../dtos/admin/create-seller-request-dto';

export class CreateSellerController {
  public static async handle(req: FastifyRequest<{ Body: CreateSellerRequestDTO }>, res: FastifyReply) {
    const sut = CreateSellerUseCaseFactory.create();
    const response = await sut.execute(CreateSellerRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
