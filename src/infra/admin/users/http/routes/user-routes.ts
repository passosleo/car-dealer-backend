import { z } from 'zod';
import { FastifyTypedInstance } from '../../../../shared/types/fastify';
import { authorize } from '../../../../shared/http/middlewares/auth-middleware';
import { CreateUserController } from '../controllers/create-user-controller';
import { ListUsersController } from '../controllers/list-users-controller';
import { GetUserByIdController } from '../controllers/get-user-by-id-controller';
import { DeleteUserController } from '../controllers/delete-user-controller';
import { UpdateUserController } from '../controllers/update-user-controller';
import { ZodHelper } from '../../../../shared/helpers/zod-helper';

export async function userRoutes(app: FastifyTypedInstance) {
  app.get(
    '/api/v1/admin/user',
    {
      preHandler: authorize(['MANAGE_USERS']),
      schema: {
        tags: ['Users'],
        summary: 'List users',
        security: [
          {
            bearerAuth: [],
          },
        ],
        querystring: z.object({
          page: z.coerce.number().optional().default(1),
          limit: z.coerce.number().optional().default(10),
          orderBy: z.enum(['asc', 'desc']).optional().default('asc'),
          search: z.string().optional(),
          status: z.enum(['all', 'active', 'inactive']).optional().default('all'),
          createdAtStart: ZodHelper.dateField('createdAtStart').optional(),
          createdAtEnd: ZodHelper.dateField('createdAtEnd').optional(),
          updatedAtStart: ZodHelper.dateField('updatedAtStart').optional(),
          updatedAtEnd: ZodHelper.dateField('updatedAtEnd').optional(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              total: z.number(),
              page: z.number(),
              limit: z.number(),
              totalPages: z.number(),
              items: z.array(
                z.object({
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
              ),
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
    ListUsersController.handle,
  );
  app.get(
    '/api/v1/admin/user/:userId',
    {
      preHandler: authorize(['MANAGE_USERS']),
      schema: {
        tags: ['Users'],
        summary: 'Get a user by id',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          userId: z.string().uuid(),
        }),
        response: {
          200: z.object({
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
    GetUserByIdController.handle,
  );
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
  app.put(
    '/api/v1/admin/user',
    {
      preHandler: authorize(['MANAGE_USERS']),
      schema: {
        tags: ['Users'],
        summary: 'Update a user',
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
          200: z.object({
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
          404: z.object({
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
    UpdateUserController.handle,
  );
  app.delete(
    '/api/v1/admin/user/:userId',
    {
      preHandler: authorize(['MANAGE_USERS']),
      schema: {
        tags: ['Users'],
        summary: 'Delete a user',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          userId: z.string().uuid(),
        }),
        response: {
          204: z.void(),
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
    DeleteUserController.handle,
  );
}
