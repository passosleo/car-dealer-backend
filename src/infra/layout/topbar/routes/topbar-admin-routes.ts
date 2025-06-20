import { z } from 'zod';
import { FastifyTypedInstance } from '../../../shared/types/fastify';
import { authorize } from '../../../shared/http/middlewares/auth-middleware';
import { CreateManyTopBarMessagesController } from '../controllers/create-many-topbar-messages-controller';
import { CreateTopBarMessageController } from '../controllers/create-topbar-message-controller';

export async function topBarAdminRoutes(app: FastifyTypedInstance) {
  app.post(
    '/api/v1/layout/topbar/message',
    {
      preHandler: authorize(['MANAGE_LAYOUT']),
      schema: {
        tags: ['TopBar'],
        summary: 'Create a new topbar message',
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: z.object({
          message: z.string().min(1).max(255),
          link: z.string().url().optional().nullable(),
          position: z.coerce.number().int().optional(),
          active: z.boolean().optional().default(true),
        }),
        response: {
          201: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              topBarMessageId: z.string().uuid(),
              message: z.string(),
              link: z.string().url().nullable(),
              position: z.number().int(),
              active: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date(),
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
          409: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          422: z.object({
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
    CreateTopBarMessageController.handle,
  );
  app.post(
    '/api/v1/layout/topbar/message/many',
    {
      preHandler: authorize(['MANAGE_LAYOUT']),
      schema: {
        tags: ['TopBar'],
        summary: 'Create a list of new topbar messages',
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: z.array(
          z.object({
            message: z.string().min(1).max(255),
            link: z.string().url().optional().nullable(),
            position: z.coerce.number().int().optional(),
            active: z.boolean().optional().default(true),
          }),
        ),
        response: {
          201: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.array(
              z.object({
                topBarMessageId: z.string().uuid(),
                message: z.string(),
                link: z.string().url().nullable(),
                position: z.number().int(),
                active: z.boolean(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            ),
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
          409: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          422: z.object({
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
    CreateManyTopBarMessagesController.handle,
  );
}
