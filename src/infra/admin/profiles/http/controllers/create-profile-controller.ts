import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { CreateProfileRequestDTO } from '../dtos/create-profile-request-dto';
import { CreateProfileUseCaseFactory } from '../../factories/create-profile-use-case-factory';

export class CreateProfileController {
  public static async handle(req: FastifyRequest<{ Body: CreateProfileRequestDTO }>, res: FastifyReply) {
    const sut = CreateProfileUseCaseFactory.create();
    const response = await sut.execute(CreateProfileRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
