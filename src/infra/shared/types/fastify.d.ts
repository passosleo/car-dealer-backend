import { FastifyBaseLogger, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from 'fastify';
import { HttpStatus } from '../http/response/http-status';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { UserAccountDTO } from '../../../domain/admin/dtos/user-account-dto';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserAccountDTO;
  }
  interface FastifyReply {
    sendResponse: <T>(statusCode: HttpStatus, data?: T) => void;
  }
}

export type FastifyTypedInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>;
