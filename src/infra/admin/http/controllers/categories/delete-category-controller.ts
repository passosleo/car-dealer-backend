import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { DeleteCategoryUseCaseFactory } from '../../../factories/categories/delete-category-use-case-factory';

export class DeleteCategoryController {
  public static async handle(req: FastifyRequest<{ Params: { categoryId: string } }>, res: FastifyReply) {
    const sut = DeleteCategoryUseCaseFactory.create();
    await sut.execute(req.params.categoryId);
    res.status(HttpStatus.NO_CONTENT.getStatusCode()).send();
  }
}
