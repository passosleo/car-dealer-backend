import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { GetUserByIdUseCaseFactory } from '../../factories/get-user-by-id-use-case-factory';

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
