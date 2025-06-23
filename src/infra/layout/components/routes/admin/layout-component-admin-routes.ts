import { z } from 'zod';
import { UpdateLayoutComponentPositionsController } from '../../controllers/admin/update-layout-component-positions-controller';
import { FastifyTypedInstance } from '../../../../shared/types/fastify';
import { authorize } from '../../../../shared/http/middlewares/auth-middleware';
import { ListLayoutComponentsController } from '../../controllers/admin/list-layout-components-controller';

export async function layoutComponentAdminRoutes(app: FastifyTypedInstance) {
  app.get(
    '/api/v1/admin/layout',
    {
      preHandler: authorize(['MANAGE_LAYOUT']),
      schema: {
        tags: ['Layout'],
        summary: 'List layout components',
        security: [
          {
            bearerAuth: [],
          },
        ],
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.array(
              z.object({
                layoutComponentId: z.string().uuid(),
                label: z.string(),
                name: z.string(),
                page: z.string(),
                description: z.string().nullable(),
                position: z.number(),
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
    ListLayoutComponentsController.handle,
  );
  app.put(
    '/api/v1/admin/layout/position/:page',
    {
      preHandler: authorize(['MANAGE_LAYOUT']),
      schema: {
        tags: ['Layout'],
        summary: 'Update layout component positions',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          page: z.enum(['home']),
        }),
        body: z.array(
          z.object({
            layoutComponentId: z.string().uuid(),
          }),
        ),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.array(
              z.object({
                layoutComponentId: z.string().uuid(),
                label: z.string(),
                name: z.string(),
                page: z.string(),
                description: z.string().nullable(),
                position: z.number(),
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
    UpdateLayoutComponentPositionsController.handle,
  );
}
