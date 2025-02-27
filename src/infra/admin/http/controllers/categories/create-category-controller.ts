import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { CreateCategoryRequestDTO } from '../../dtos/categories/create-category-request-dto';
import { CreateCategoryUseCaseFactory } from '../../../factories/categories/create-category-use-case-factory';

export class CreateCategoryController {
  public static async handle(req: FastifyRequest<{ Body: CreateCategoryRequestDTO }>, res: FastifyReply) {
    const sut = CreateCategoryUseCaseFactory.create();
    const response = await sut.execute(CreateCategoryRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
