import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserRequestDTO } from '../../dtos/admin/create-user-request-dto';
import { CreateUserUseCaseFactory } from '../../factories/admin/create-user-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class CreateUserController {
  public static async handle(req: FastifyRequest<{ Body: CreateUserRequestDTO }>, res: FastifyReply) {
    const sut = CreateUserUseCaseFactory.create();
    const response = await sut.execute(CreateUserRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
