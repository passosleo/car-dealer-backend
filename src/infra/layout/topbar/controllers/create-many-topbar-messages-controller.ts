import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../shared/http/response/http-status';
import { CreateTopBarMessageRequestDTO } from '../dtos/admin/create-topbar-message-request-dto';
import { CreateManyTopBarMessageUseCaseFactory } from '../factories/create-many-topbar-messages-use-case-factory';

export class CreateManyTopBarMessagesController {
  public static async handle(req: FastifyRequest<{ Body: CreateTopBarMessageRequestDTO[] }>, res: FastifyReply) {
    const sut = CreateManyTopBarMessageUseCaseFactory.create();
    const response = await sut.execute(req.body.map(CreateTopBarMessageRequestDTO.create));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
