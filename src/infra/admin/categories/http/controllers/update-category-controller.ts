import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { UpdateCategoryUseCaseFactory } from '../../../categories/factories/update-category-use-case-factory';
import { UpdateCategoryRequestDTO } from '../dtos/update-category-request-dto';

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
