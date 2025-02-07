import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../response/http-status';
import { RequestSchema } from '../../types/generic';

export function validateRequest<T>(schema: RequestSchema<T>) {
  function createZodSchema<T>(requestSchema: RequestSchema<T>) {
    return z.object({
      body: requestSchema.body ? z.object(requestSchema.body) : z.unknown(),
      query: requestSchema.query ? z.object(requestSchema.query) : z.unknown(),
      params: requestSchema.params ? z.object(requestSchema.params) : z.unknown(),
    });
  }

  return (req: FastifyRequest, res: FastifyReply, next: () => void) => {
    const data = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    const zodSchema = createZodSchema(schema);
    const validation = zodSchema.safeParse(data);

    if (validation.success) {
      req.body = validation.data.body;
      req.query = validation.data.query as Record<string, string>;
      req.params = validation.data.params as Record<string, string>;

      next();
    } else {
      return res.sendResponse(HttpStatus.BAD_REQUEST, {
        error: JSON.parse(validation.error.message),
      });
    }
  };
}
