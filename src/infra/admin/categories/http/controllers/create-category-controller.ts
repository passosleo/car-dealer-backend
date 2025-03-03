import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { CreateCategoryUseCaseFactory } from '../../../categories/factories/create-category-use-case-factory';
import { CreateCategoryRequestDTO } from '../dtos/create-category-request-dto';

export class CreateCategoryController {
  public static async handle(req: FastifyRequest<{ Body: CreateCategoryRequestDTO }>, res: FastifyReply) {
    const sut = CreateCategoryUseCaseFactory.create();
    const response = await sut.execute(CreateCategoryRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
