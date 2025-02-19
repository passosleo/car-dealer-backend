import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { GetProfileByIdUseCaseFactory } from '../../../factories/profiles/get-profile-by-id-use-case-factory';

export class GetProfileByIdController {
  public static async handle(
    req: FastifyRequest<{
      Params: {
        profileId: string;
      };
    }>,
    res: FastifyReply,
  ) {
    const sut = GetProfileByIdUseCaseFactory.create();
    const response = await sut.execute(req.params.profileId);
    res.sendResponse(HttpStatus.OK, response);
  }
}
