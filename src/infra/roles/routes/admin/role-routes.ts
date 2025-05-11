import { z } from 'zod';
import { FastifyTypedInstance } from '../../../../shared/types/fastify';
import { authorize } from '../../../../shared/http/middlewares/auth-middleware';
import { ListRolesController } from '../../controllers/admin/list-roles-controller';

export async function roleRoutes(app: FastifyTypedInstance) {
  app.get(
    '/api/v1/admin/role',
    {
      preHandler: authorize(),
      schema: {
        tags: ['Roles'],
        summary: 'List all roles',
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
                roleId: z.string().uuid(),
                name: z.string(),
                label: z.string(),
                description: z.string().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            ),
          }),
          // 400: z.object({
          //   statusCode: z.number(),
          //   message: z.string(),
          //   data: z.object({
          //     error: z.array(z.any()),
          //   }),
          // }),
          401: z.object({
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
    ListRolesController.handle,
  );
}
