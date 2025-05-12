import { FastifyReply, FastifyRequest } from 'fastify';
import { GetUserByIdUseCaseFactory } from '../../factories/admin/get-user-by-id-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class GetUserByIdController {
  public static async handle(
    req: FastifyRequest<{
      Params: {
        userId: string;
      };
    }>,
    res: FastifyReply,
  ) {
    const sut = GetUserByIdUseCaseFactory.create();
    const response = await sut.execute(req.params.userId);
    res.sendResponse(HttpStatus.OK, response);
  }
}
