import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateSellerUseCaseFactory } from '../../factories/admin/create-seller-use-case-factory';
import { CreateSellerRequestDTO } from '../../dtos/admin/create-seller-request-dto';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class CreateSellerController {
  public static async handle(req: FastifyRequest<{ Body: CreateSellerRequestDTO }>, res: FastifyReply) {
    const sut = CreateSellerUseCaseFactory.create();
    const response = await sut.execute(CreateSellerRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
