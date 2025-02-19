import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { UpdateProfileUseCaseFactory } from '../../../factories/profiles/update-profile-use-case-factory';
import { UpdateProfileRequestDTO } from '../../dtos/profiles/update-profile-request-dto';

export class UpdateProfileController {
  public static async handle(
    req: FastifyRequest<{
      Params: {
        profileId: string;
      };
      Body: UpdateProfileRequestDTO;
    }>,
    res: FastifyReply,
  ) {
    const sut = UpdateProfileUseCaseFactory.create();
    const response = await sut.execute(req.params.profileId, UpdateProfileRequestDTO.create(req.body));
    res.sendResponse(HttpStatus.OK, response);
  }
}
