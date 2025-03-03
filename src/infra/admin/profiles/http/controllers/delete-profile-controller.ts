import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { DeleteProfileUseCaseFactory } from '../../factories/delete-profile-use-case-factory';

export class DeleteProfileController {
  public static async handle(req: FastifyRequest<{ Params: { profileId: string } }>, res: FastifyReply) {
    const sut = DeleteProfileUseCaseFactory.create();
    await sut.execute(req.params.profileId);
    res.status(HttpStatus.NO_CONTENT.getStatusCode()).send();
  }
}
