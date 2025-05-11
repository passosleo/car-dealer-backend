import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { DeleteUserUseCaseFactory } from '../../factories/admin/delete-user-use-case-factory';

export class DeleteUserController {
  public static async handle(req: FastifyRequest<{ Params: { userId: string } }>, res: FastifyReply) {
    const sut = DeleteUserUseCaseFactory.create();
    await sut.execute(req.params.userId);
    res.status(HttpStatus.NO_CONTENT.getStatusCode()).send();
  }
}
