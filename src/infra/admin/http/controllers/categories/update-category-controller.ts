import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { UpdateCategoryRequestDTO } from '../../dtos/categories/update-category-request-dto';
import { UpdateCategoryUseCaseFactory } from '../../../factories/categories/update-category-use-case-factory';

export class UpdateCategoryController {
  public static async handle(
    req: FastifyRequest<{ Params: { categoryId: string }; Body: UpdateCategoryRequestDTO }>,
    res: FastifyReply,
  ) {
    const sut = UpdateCategoryUseCaseFactory.create();
    const response = await sut.execute(req.params.categoryId, UpdateCategoryRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
