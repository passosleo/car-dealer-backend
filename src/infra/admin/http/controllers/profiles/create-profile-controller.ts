import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { CreateProfileUseCaseFactory } from '../../../factories/profiles/create-profile-use-case-factory';
import { CreateProfileRequestDTO } from '../../dtos/profiles/create-profile-request-dto';

export class CreateProfileController {
  public static async handle(req: FastifyRequest<{ Body: CreateProfileRequestDTO }>, res: FastifyReply) {
    const sut = CreateProfileUseCaseFactory.create();
    const response = await sut.execute(CreateProfileRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
