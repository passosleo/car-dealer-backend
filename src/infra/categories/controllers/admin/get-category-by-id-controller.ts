import { FastifyReply, FastifyRequest } from 'fastify';
import { GetCategoryByIdUseCaseFactory } from '../../factories/admin/get-category-by-id-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class GetCategoryByIdController {
  public static async handle(
    req: FastifyRequest<{
      Params: {
        categoryId: string;
      };
    }>,
    res: FastifyReply,
  ) {
    const sut = GetCategoryByIdUseCaseFactory.create();
    const response = await sut.execute(req.params.categoryId);
    res.sendResponse(HttpStatus.OK, response);
  }
}
