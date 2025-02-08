import { z } from 'zod';
import { FastifyTypedInstance } from '../../types/fastify';
import { AuthenticateUserController } from '../controllers/auth/authenticate-user-controller';

export async function authRoutes(app: FastifyTypedInstance) {
  app.post(
    '/api/v1/auth/token',
    {
      schema: {
        tags: ['Authentication'],
        summary: 'Authenticate user',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              type: z.string(),
              token: z.string(),
              refreshToken: z.string(),
              expiresIn: z.number(),
            }),
          }),
          400: z.object({
            statusCode: z.number(),
            code: z.string(),
            error: z.string(),
            message: z.string(),
          }),
          404: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({}),
          }),
          401: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({}),
          }),
          500: z.object({
            statusCode: z.number(),
            message: z.string(),
          }),
        },
      },
    },
    AuthenticateUserController.handle,
  );
}
