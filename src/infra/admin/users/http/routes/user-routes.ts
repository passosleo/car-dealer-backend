import { z } from 'zod';
import { FastifyTypedInstance } from '../../../../shared/types/fastify';
import { authorize } from '../../../../shared/http/middlewares/auth-middleware';
import { CreateUserController } from '../controllers/create-user-controller';

export async function userRoutes(app: FastifyTypedInstance) {
  app.post(
    '/api/v1/admin/user',
    {
      preHandler: authorize(['MANAGE_USERS']),
      schema: {
        tags: ['Users'],
        summary: 'Create a new user',
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: z.object({
          firstName: z.string(),
          lastName: z.string(),
          email: z.string().email(),
          active: z.boolean(),
          profileId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              userId: z.string().uuid(),
              firstName: z.string(),
              lastName: z.string(),
              email: z.string().email(),
              passwordChangedAt: z.date().nullable(),
              active: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date(),
              profile: z.object({
                profileId: z.string().uuid(),
                name: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
                roles: z.array(
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
    CreateUserController.handle,
  );
}
