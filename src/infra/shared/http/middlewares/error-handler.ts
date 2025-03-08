import { FastifyInstance } from 'fastify';
import { hasZodFastifySchemaValidationErrors, isResponseSerializationError } from 'fastify-type-provider-zod';
import { HttpException } from '../response/http-exception';
import { HttpStatus } from '../response/http-status';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function setupErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err, req, res) => {
    if (err instanceof HttpException) {
      return res.sendResponse(err.statusCode, { error: err.message });
    }

    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2003') {
        return res.code(409).send({
          statusCode: 409,
          message: 'Conflict',
          data: { error: 'Resource cannot be deleted because it is being used by another resource' },
        });
      }
    }

    if (hasZodFastifySchemaValidationErrors(err)) {
      return res.code(400).send({
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
      return res.code(500).send({
        statusCode: 500,
        message: 'Internal Server Error',
        data: { error: err.validation },
      });
    }

    return res.sendResponse(HttpStatus.INTERNAL_SERVER_ERROR);
  });
}
