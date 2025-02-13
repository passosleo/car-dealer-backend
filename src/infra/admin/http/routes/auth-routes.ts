import { z } from 'zod';
import { FastifyTypedInstance } from '../../../shared/types/fastify';
import { CreateSessionController } from '../controllers/auth/create-session-controller';
import { RefreshSessionController } from '../controllers/auth/refresh-session-controller';
import { SendRecoverPasswordController } from '../controllers/auth/send-recover-password-controller';
import { ValidateRecoverPasswordRequestController } from '../controllers/auth/validate-recover-password-request-controller';
import { RecoverPasswordController } from '../controllers/auth/recover-password-controller';

export async function authRoutes(app: FastifyTypedInstance) {
  app.post(
    '/api/v1/admin/auth/token',
    {
      schema: {
        tags: ['Authentication'],
        summary: 'Create a new session',
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
            message: z.string(),
            data: z.object({
              error: z.array(z.any()),
            }),
          }),
          401: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          404: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          429: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          500: z.object({
            statusCode: z.number(),
            message: z.string(),
          }),
        },
      },
    },
    CreateSessionController.handle,
  );

  app.post(
    '/api/v1/admin/auth/refresh-token',
    {
      schema: {
        tags: ['Authentication'],
        summary: 'Refresh a session',
        body: z.object({
          refreshToken: z.string(),
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
            message: z.string(),
            data: z.object({
              error: z.array(z.any()),
            }),
          }),
          401: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          404: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          429: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          500: z.object({
            statusCode: z.number(),
            message: z.string(),
          }),
        },
      },
    },
    RefreshSessionController.handle,
  );

  app.post(
    '/api/v1/admin/auth/recover-password',
    {
      schema: {
        tags: ['Authentication'],
        summary: 'Recover user password',
        body: z.object({
          newPassword: z.string().min(8),
          token: z.string(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
          }),
          400: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.array(z.any()),
            }),
          }),
          401: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          403: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          404: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          429: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          500: z.object({
            statusCode: z.number(),
            message: z.string(),
          }),
        },
      },
    },
    RecoverPasswordController.handle,
  );

  app.post(
    '/api/v1/admin/auth/recover-password/send',
    {
      schema: {
        tags: ['Authentication'],
        summary: 'Send a recover password email',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
          }),
          400: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.array(z.any()),
            }),
          }),
          401: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          403: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          404: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          429: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          500: z.object({
            statusCode: z.number(),
            message: z.string(),
          }),
        },
      },
    },
    SendRecoverPasswordController.handle,
  );

  app.get(
    '/api/v1/admin/auth/recover-password/validate',
    {
      schema: {
        tags: ['Authentication'],
        summary: 'Validate a recover password request',
        querystring: z.object({
          token: z.string(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
          }),
          400: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.array(z.any()),
            }),
          }),
          401: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          404: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          429: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          500: z.object({
            statusCode: z.number(),
            message: z.string(),
          }),
        },
      },
    },
    ValidateRecoverPasswordRequestController.handle,
  );
}
