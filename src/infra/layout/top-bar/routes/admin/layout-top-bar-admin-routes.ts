import { z } from 'zod';
import { layoutTopBarConfigResponseSchema } from '../../schemas/shared/layout-top-bar-config-response-schema';
import { updateLayoutTopBarConfigRequestSchema } from '../../schemas/admin/update-layout-top-bar-config-request-schema';
import { FastifyTypedInstance } from '../../../../shared/types/fastify';
import { authorize } from '../../../../shared/http/middlewares/auth-middleware';
import { GetActiveLayoutTopBarConfigController } from '../../controllers/admin/get-active-layout-top-bar-config-controller';
import { UpdateLayoutTopBarConfigController } from '../../controllers/admin/update-layout-top-bar-config-controller';

export async function layoutTopBarAdminRoutes(app: FastifyTypedInstance) {
  app.get(
    '/api/v1/admin/layout/top-bar',
    {
      preHandler: authorize(['MANAGE_LAYOUT']),
      schema: {
        tags: ['Layout'],
        summary: 'Get active layout top bar configuration',
        security: [
          {
            bearerAuth: [],
          },
        ],
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: layoutTopBarConfigResponseSchema,
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
    GetActiveLayoutTopBarConfigController.handle,
  );
  app.put(
    '/api/v1/admin/layout/top-bar/:layoutTopBarConfigId',
    {
      preHandler: authorize(['MANAGE_LAYOUT']),
      schema: {
        tags: ['Layout'],
        summary: 'Change layout top bar configuration',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          layoutTopBarConfigId: z.string().uuid(),
        }),
        body: updateLayoutTopBarConfigRequestSchema,
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: layoutTopBarConfigResponseSchema,
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
    UpdateLayoutTopBarConfigController.handle,
  );
}
