import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { UpdateProfileRequestDTO } from '../../dtos/admin/update-profile-request-dto';
import { UpdateProfileUseCaseFactory } from '../../factories/update-profile-use-case-factory';

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
