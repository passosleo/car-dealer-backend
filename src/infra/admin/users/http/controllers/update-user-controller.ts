import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { UpdateUserRequestDTO } from '../dtos/update-user-request-dto';
import { UpdateUserUseCaseFactory } from '../../factories/update-user-use-case-factory';

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
