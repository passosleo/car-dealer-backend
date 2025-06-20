import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../shared/http/response/http-status';
import { CreateTopBarMessageRequestDTO } from '../dtos/admin/create-topbar-message-request-dto';
import { CreateTopBarMessageUseCaseFactory } from '../factories/create-topbar-message-use-case-factory';

export class CreateTopBarMessageController {
  public static async handle(req: FastifyRequest<{ Body: CreateTopBarMessageRequestDTO }>, res: FastifyReply) {
    const sut = CreateTopBarMessageUseCaseFactory.create();
    const response = await sut.execute(CreateTopBarMessageRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
