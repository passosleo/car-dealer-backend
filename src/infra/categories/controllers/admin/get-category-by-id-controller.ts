import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { GetCategoryByIdUseCaseFactory } from '../../../categories/factories/get-category-by-id-use-case-factory';

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
