import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCategoryRequestDTO } from '../../dtos/admin/create-category-request-dto';
import { CreateCategoryUseCaseFactory } from '../../factories/admin/create-category-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class CreateCategoryController {
  public static async handle(req: FastifyRequest<{ Body: CreateCategoryRequestDTO }>, res: FastifyReply) {
    const sut = CreateCategoryUseCaseFactory.create();
    const response = await sut.execute(CreateCategoryRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
