import { z } from 'zod';
import { FastifyTypedInstance } from '../../../shared/types/fastify';
import { CreateProfileController } from '../controllers/profiles/create-profile-controller';
import { UpdateProfileController } from '../controllers/profiles/update-profile-controller';
import { DeleteProfileController } from '../controllers/profiles/delete-profile-controller';
import { GetProfileByIdController } from '../controllers/profiles/get-profile-by-id-controller';
import { ListProfilesController } from '../controllers/profiles/list-profiles-controller';

export async function profileRoutes(app: FastifyTypedInstance) {
  app.get(
    '/api/v1/admin/profile',
    {
      // preHandler: authorize(['admin']),
      schema: {
        tags: ['Profiles'],
        summary: 'List profiles',
        security: [
          {
            bearerAuth: [],
          },
        ],
        querystring: z.object({
          page: z
            .string()
            .optional()
            .default('1')
            .transform((v) => Number(v)),
          limit: z
            .string()
            .optional()
            .default('10')
            .transform((v) => Number(v)),
          name: z.string().optional(),
          createdAtStart: z.string().optional(),
          createdAtEnd: z.string().optional(),
          updatedAtStart: z.string().optional(),
          updatedAtEnd: z.string().optional(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              total: z.number(),
              page: z.number(),
              limit: z.number(),
              items: z.array(
                z.object({
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
    ListProfilesController.handle,
  );
  app.get(
    '/api/v1/admin/profile/:profileId',
    {
      // preHandler: authorize(['admin']),
      schema: {
        tags: ['Profiles'],
        summary: 'Get a profile by id',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          profileId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
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
    GetProfileByIdController.handle,
  );
  app.post(
    '/api/v1/admin/profile',
    {
      // preHandler: authorize(['admin']),
      schema: {
        tags: ['Profiles'],
        summary: 'Create a new profile',
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: z.object({
          name: z.string(),
          roles: z
            .array(
              z.object({
                roleId: z.string().uuid(),
              }),
            )
            .nonempty(),
        }),
        response: {
          201: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
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
    CreateProfileController.handle,
  );
  app.put(
    '/api/v1/admin/profile/:profileId',
    {
      // preHandler: authorize(['admin']),
      schema: {
        tags: ['Profiles'],
        summary: 'Update a profile',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          profileId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
          roles: z
            .array(
              z.object({
                roleId: z.string().uuid(),
              }),
            )
            .nonempty(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
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
    UpdateProfileController.handle,
  );
  app.delete(
    '/api/v1/admin/profile/:profileId',
    {
      // preHandler: authorize(['admin']),
      schema: {
        tags: ['Profiles'],
        summary: 'Delete a profile',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          profileId: z.string().uuid(),
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
    DeleteProfileController.handle,
  );
}
