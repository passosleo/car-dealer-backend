import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateProfileRequestDTO } from '../../dtos/admin/create-profile-request-dto';
import { CreateProfileUseCaseFactory } from '../../factories/admin/create-profile-use-case-factory';
import { HttpStatus } from '../../../shared/http/response/http-status';

export class CreateProfileController {
  public static async handle(req: FastifyRequest<{ Body: CreateProfileRequestDTO }>, res: FastifyReply) {
    const sut = CreateProfileUseCaseFactory.create();
    const response = await sut.execute(CreateProfileRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.CREATED, response);
  }
}
