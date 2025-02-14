import { FastifyInstance } from 'fastify';
import { hasZodFastifySchemaValidationErrors, isResponseSerializationError } from 'fastify-type-provider-zod';
import { HttpException } from '../response/http-exception';
import { HttpStatus } from '../response/http-status';

export function setupErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err, req, reply) => {
    if (hasZodFastifySchemaValidationErrors(err)) {
      return reply.code(400).send({
        statusCode: 400,
        message: 'Bad Request',
        data: { error: err.validation },
      });
    }

    console.error({
      method: req.method,
      url: req.url,
      message: err.message,
      stack: err.stack,
      raw: JSON.stringify(err, null, 2),
    });

    if (isResponseSerializationError(err)) {
      return reply.code(500).send({
        statusCode: 500,
        message: 'Internal Server Error',
        data: { error: err.validation },
      });
    }

    if (err instanceof HttpException) {
      return reply.sendResponse(err.statusCode, { error: err.message });
    }

    return reply.sendResponse(HttpStatus.INTERNAL_SERVER_ERROR);
  });
}
