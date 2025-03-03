import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { CreateSellerRequestDTO } from '../../dtos/sellers/create-seller-request-dto';
import { CreateSellerUseCaseFactory } from '../../../factories/sellers/create-seller-use-case-factory';

export class CreateSellerController {
  public static async handle(req: FastifyRequest<{ Body: CreateSellerRequestDTO }>, res: FastifyReply) {
    const sut = CreateSellerUseCaseFactory.create();
    const response = await sut.execute(CreateSellerRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
