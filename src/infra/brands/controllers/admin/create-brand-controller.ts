import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../shared/http/response/http-status';
import { CreateBrandRequestDTO } from '../../dtos/admin/create-brand-request-dto';
import { CreateBrandUseCaseFactory } from '../../factories/admin/create-brand-use-case-factory';

export class CreateBrandController {
  public static async handle(req: FastifyRequest<{ Body: CreateBrandRequestDTO }>, res: FastifyReply) {
    const sut = CreateBrandUseCaseFactory.create();
    const response = await sut.execute(CreateBrandRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
