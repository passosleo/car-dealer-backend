import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateUserRequestDTO } from '../../dtos/admin/update-user-request-dto';
import { UpdateUserUseCaseFactory } from '../../factories/admin/update-user-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class UpdateUserController {
  public static async handle(
    req: FastifyRequest<{ Params: { userId: string }; Body: UpdateUserRequestDTO }>,
    res: FastifyReply,
  ) {
    const sut = UpdateUserUseCaseFactory.create();
    const response = await sut.execute(req.params.userId, UpdateUserRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
