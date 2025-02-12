import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateSessionRequestDTO } from '../../dtos/auth/create-session-request-dto';
import { CreateSessionUseCaseFactory } from '../../../factories/auth/create-session-use-case-factory';
import { HttpStatus } from '../../../../shared/http/response/http-status';

export class CreateSessionController {
  public static async handle(req: FastifyRequest<{ Body: CreateSessionRequestDTO }>, res: FastifyReply) {
    const sut = CreateSessionUseCaseFactory.create();
    const response = await sut.execute(CreateSessionRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
