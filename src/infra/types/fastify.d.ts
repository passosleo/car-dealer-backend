import { HttpStatus } from '../http/response/http-status';

declare module 'fastify' {
  interface FastifyReply {
    sendResponse: <T>(statusCode: HttpStatus, data?: T) => void;
  }
}
