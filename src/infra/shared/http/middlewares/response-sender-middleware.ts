import { HttpStatus } from '../response/http-status';
import { FastifyReply, FastifyRequest } from 'fastify';

export function sendResponse(req: FastifyRequest, res: FastifyReply, next: () => void) {
  res.sendResponse = <T>(status: HttpStatus, data?: T) => {
    res.code(status.code).send({
      statusCode: status.code,
      message: status.getReasonPhrase(),
      data,
    });
  };

  next();
}
