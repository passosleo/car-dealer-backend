import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateSessionUseCaseFactory } from '../../../auth/factories/create-session-use-case-factory';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { CreateSessionRequestDTO } from '../dtos/create-session-request-dto';

export class CreateSessionController {
  public static async handle(req: FastifyRequest<{ Body: CreateSessionRequestDTO }>, res: FastifyReply) {
    const sut = CreateSessionUseCaseFactory.create();
    const response = await sut.execute(CreateSessionRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
