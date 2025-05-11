import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../../shared/http/response/http-status';
import { GetUserInfoUseCaseFactory } from '../../factories/admin/get-user-info-use-case-factory';

export class GetUserInfoController {
  public static async handle(req: FastifyRequest, res: FastifyReply) {
    const sut = GetUserInfoUseCaseFactory.create(req.user);
    const response = await sut.execute();
    res.sendResponse(HttpStatus.OK, response);
  }
}
